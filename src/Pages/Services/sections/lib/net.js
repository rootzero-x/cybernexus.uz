// src/Pages/Services/sections/lib/net.js
//
// IPv4 / CIDR maths. Kept out of the component so it can be tested on its own.

/** Dotted quad -> unsigned 32-bit, or null when it is not a valid IPv4. */
export function ipToLong(ip) {
  const parts = String(ip).trim().split(".");
  if (parts.length !== 4) return null;

  let out = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const n = Number(part);
    if (n > 255) return null;
    out = out * 256 + n;
  }
  // >>> 0 keeps it unsigned: JavaScript bitwise operators work on signed
  // 32-bit values, so anything above 127.x.x.x would otherwise go negative.
  return out >>> 0;
}

export function longToIp(n) {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

export function classifyIp(long) {
  const a = (long >>> 24) & 255;
  const b = (long >>> 16) & 255;

  if (a === 10) return "Private (RFC 1918)";
  if (a === 172 && b >= 16 && b <= 31) return "Private (RFC 1918)";
  if (a === 192 && b === 168) return "Private (RFC 1918)";
  if (a === 127) return "Loopback";
  if (a === 169 && b === 254) return "Link-local";
  if (a >= 224 && a <= 239) return "Multicast";
  if (a >= 240) return "Zaxiralangan";
  return "Public";
}

/**
 * Parse "a.b.c.d/prefix" into its network facts.
 *
 * @returns {null | {error: string} | object}
 */
export function calculateSubnet(input) {
  const raw = String(input ?? "").trim();
  if (!raw) return null;

  const [ipPart, prefixPart] = raw.split("/");
  const ip = ipToLong(ipPart);
  if (ip === null) return { error: "IPv4 manzil noto'g'ri (masalan 192.168.1.10)." };

  const prefix = prefixPart === undefined ? 24 : Number(prefixPart);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    return { error: "Prefiks 0 va 32 orasida bo'lishi kerak." };
  }

  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (ip & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;

  const total = 2 ** (32 - prefix);
  // A /31 is a point-to-point link and a /32 a single host: neither reserves a
  // network and broadcast address, so the usual "total - 2" does not apply.
  const usable = prefix >= 31 ? total : Math.max(0, total - 2);

  return {
    prefix,
    address: longToIp(ip),
    netmask: longToIp(mask),
    wildcard: longToIp(~mask >>> 0),
    network: longToIp(network),
    broadcast: longToIp(broadcast),
    firstHost: usable > 0 ? longToIp(prefix >= 31 ? network : network + 1) : "—",
    lastHost: usable > 0 ? longToIp(prefix >= 31 ? broadcast : broadcast - 1) : "—",
    total,
    usable,
    kind: classifyIp(ip),
    binaryMask: [0, 1, 2, 3]
      .map((i) => (((mask >>> (24 - i * 8)) & 255) >>> 0).toString(2).padStart(8, "0"))
      .join("."),
  };
}
