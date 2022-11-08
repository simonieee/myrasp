import React from "react";
import "../pow.css";

const BlockInfo = ({ block }) => {
  return (
    <div className="blockinfo">
      <h3>Block #{block.height}</h3>
      <div style={{ marginTop: 10 }}>
        <p>Previous Hash</p>
        <div className="block-data">{block.prevBlockHash}</div>
        <p>Hash</p>
        <div className="block-data">{block.hash}</div>
        <p>Nonce</p>
        <div className="block-data">{block.nonce}</div>
        <p>Data</p>
        <div className="block-data">{block.blockData}</div>
        <p>Timestamp</p>
        <div className="block-data">{block.timestamp}</div>
      </div>
    </div>
  );
};

export default BlockInfo;
