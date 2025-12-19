import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

const UuidGenerator = () => {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState([]);
  const [error, setError] = useState("");

  const generateUuids = () => {
    if (count < 1 || count > 10000) {
      setError("Son 1 dan 10,000 gacha bo'lishi kerak.");
      return;
    }
    setError("");
    const newUuids = Array.from({ length: count }, () => uuidv4());
    setUuids(newUuids);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("UUID nusxalandi!");
  };

  const copyAll = () => {
    const allText = uuids.join("\n");
    navigator.clipboard.writeText(allText);
    alert("Barcha UUIDlar nusxalandi!");
  };

  return (
    <div className="min-h-screen bg-black text-neon-green font-mono flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-2xl bg-black bg-opacity-80 border-2 border-neon-green rounded-lg p-6 shadow-neon"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 animate-pulse">
          UUID Generator
        </h2>
        <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-4">
          <label className="text-lg">Necha dona UUID yaratish?</label>
          <input
            type="number"
            value={count}
            onChange={(e) =>
              setCount(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-24 p-2 bg-gray-800 text-white border border-neon-green rounded-md"
            min="1"
            max="10000"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <motion.button
          onClick={generateUuids}
          className="w-full py-2 bg-gradient-to-r from-neon-green to-neon-blue text-black rounded-md font-semibold mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          UUID Yaratish
        </motion.button>
        {uuids.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">
                Yaratilgan UUIDlar ({uuids.length} ta):
              </h3>
              <button
                onClick={copyAll}
                className="py-1 px-3 bg-gray-800 text-neon-green border border-neon-green rounded-md hover:bg-neon-green hover:text-black"
              >
                Barchasini Nusxalash
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-3 bg-gray-800 text-white rounded-md border border-neon-green">
              <ul className="space-y-2">
                {uuids.map((uuid, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between break-all"
                  >
                    <span>{uuid}</span>
                    <button
                      onClick={() => copyToClipboard(uuid)}
                      className="ml-2 py-1 px-2 bg-gray-700 text-neon-green rounded-md hover:bg-neon-green hover:text-black"
                    >
                      Nusxalash
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default UuidGenerator;
