import React, { useState } from "react";
import sha256 from "sha256";
import BlockInfo from "./Components/BlockInfo";
import "./pow.css";

const PoWPresenter = () => {
  /* Router */
  /* State */
  const [blocks, setBlocks] = useState([]);
  const [blockData, setBlockData] = useState("");
  const [nonce, setNonce] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [interval, setTheInterval] = useState();
  const [mining, setMining] = useState(false);
  /* Hooks */
  /* Functions */
  /**
   * hash 계산
   */
  const candidateHash = sha256(
    `${blockData}${nonce}${difficulty}${
      blocks.length === 0 ? "0x" : blocks[0].hash
    }`
  );
  const needzero = "0".repeat(difficulty);
  const canMine = candidateHash.startsWith(needzero);
  const autoFindNonce = (e) => {
    setMining(true);
    e.preventDefault();
    const interval = setInterval(() => {
      setNonce((nonce) => nonce + 1);
    }, 10);
    setTheInterval(interval);
  };
  if (canMine && interval) {
    global.clearTimeout(interval);
  }
  /**
   * 블록데이터 변경
   * @param {*} e
   */
  const changeBlockData = (e) => {
    setBlockData(e.target.value);
  };
  /**
   * 블록 Nonce값 변경
   * @param {*} e
   */
  const changeNonce = (e) => {
    const nonceNum = Number(e.target.value);
    setNonce(nonceNum);
  };
  /**
   * 채굴 난이도 조정
   * @param {*} e
   */
  const changeDifficulty = (e) => {
    const diffNum = Number(e.target.value);
    setDifficulty(diffNum);
  };
  /**
   * 블록 채굴
   */
  const handleMiningBlcok = () => {
    const prevBlockHash = blocks.length === 0 ? "0x" : blocks[0].hash;
    const timestamp = Date.now();
    const mineBlock = {
      height: blocks.length,
      blockData: blockData,
      prevBlockHash: prevBlockHash,
      hash: candidateHash,
      timestamp: timestamp,
      nonce: nonce,
    };
    setBlocks((blocks) => [mineBlock, ...blocks]);
    setBlockData("");
    setDifficulty(2);
    setNonce(0);
    setTheInterval("");
    setMining(false);
  };
  /* Render */
  return (
    <div className="content-area">
      <div className="pow-container">
        <div className="pow-input">
          <h2>작업증명(Proof of Work)</h2>
          <p>Block Data</p>
          <input
            className="input-data"
            type="text"
            placeholder="Block Data"
            value={blockData}
            onChange={changeBlockData}
            disabled={mining}
          />
          <p>Nonce</p>
          <div className="nonce-container">
            <input
              className="input-nonce"
              min={0}
              type="number"
              placeholder="Nonce"
              value={nonce}
              onChange={changeNonce}
              disabled={mining}
            />
            <button onClick={autoFindNonce}>자동</button>
          </div>
          <p>difficulty</p>
          <div className="mine-container">
            <input
              className="input-difficulty"
              min={1}
              max={5}
              type="number"
              placeholder="difficulty"
              value={difficulty}
              onChange={changeDifficulty}
              disabled={mining}
            />
            <button
              onClick={handleMiningBlcok}
              disabled={!canMine}
              style={{ opacity: canMine ? 1 : 0.5 }}
            >
              Mine Block!
            </button>
          </div>
        </div>
        <div className="pow-output">
          <h2>후보 블록(Candidate Block)</h2>
          <div className="data-container">
            <div className="data">
              <p>Previous Hash</p>
              <div className="prevhash" style={{ fontSize: 14 }}>
                {blocks.length === 0 ? "0x" : blocks[0].hash}
              </div>
            </div>
            <div className="data">
              <p>Data</p>
              <div className="output-data" style={{ fontSize: 14 }}>
                {blockData}
              </div>
            </div>
            <div className="data">
              <p>Hash</p>
              <div className="hash" style={{ fontSize: 14 }}>
                {candidateHash}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blockinfo-container">
        {blocks.map((block) => {
          return <BlockInfo block={block} key={block.height} />;
        })}
      </div>
    </div>
  );
};

export default PoWPresenter;
