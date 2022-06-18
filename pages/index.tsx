/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import React, { useEffect, useState } from "react";

import {
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import {
  BsGenderMale,
  BsGenderFemale,
  BsFillArrowUpSquareFill,
  BsPencilFill,
} from "react-icons/bs";
const Home = () => {
  const [level, setLevel] = useState(1);
  const [item, setItem] = useState(0);
  const [gold, setGold] = useState(0);
  const [isMale, setIsMale] = useState(true);
  const [bonus, setBonus] = useState(0);
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [userImage, setUserImage] = useState<string>(
    "/level1-male.png"
  );

  const handleLevelUp = () => {
    if (level > 9) {
      return alert("Não é possível aumentar o level");
    }
    if (gold >= 1000) {
      setLevel((prevState) => prevState + 1);
      setGold((prevState) => prevState - 1000);
      return;
    } else alert("Não tem gold o súficiente");
  };

  const handleNameChange = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(ev);
    setName(ev.target.value);
  };

  useEffect(() => {
    if (level >= 10) {
      alert("Você chegou no nível máximo");
    }
  }, [level]);

  useEffect(() => {
    switch (level) {
      case 1:
      case 2:
      case 3:
        setUserImage(
          isMale ? "/level1-male.png" : "/level1-female.png"
        );
        break;
      case 4:
      case 5:
      case 6:
        setUserImage(
          isMale ? "/level2-male.png" : "/level2-female.png"
        );
        break;
      default:
        setUserImage(
          isMale ? "/level3-male.png" : "/level3-female.png"
        );
        break;
    }
  }, [isMale, level]);
  const resetAll = () => {
    setLevel(1);
    setItem(0);
    setGold(0);
    setIsMale(true);
    setBonus(0);
    setUserImage("/level1-male.png");
  };
  return (
    <div className="munchkin">
      <div className="name">
        {!confirm ? (
          <input
            type="text"
            onChange={(ev) => handleNameChange(ev)}
          />
        ) : (
          <h1>{name}</h1>
        )}
        {!confirm && (
          <button
            onClick={() =>
              setConfirm((prevState) => !prevState)
            }
            style={{ height: "100%", width: 42 }}
          >
            Ok
          </button>
        )}
        {confirm && (
          <button
            onClick={() =>
              setConfirm((prevState) => !prevState)
            }
          >
            <BsPencilFill size={24} />
          </button>
        )}
      </div>
      <button style={{ marginTop: 24 }} onClick={resetAll}>
        Reset
      </button>
      {isMale ? (
        <BsGenderMale
          size={48}
          onClick={() =>
            setIsMale((prevState) => !prevState)
          }
          className="gender"
        />
      ) : (
        <BsGenderFemale
          size={48}
          onClick={() =>
            setIsMale((prevState) => !prevState)
          }
          className="gender"
        />
      )}
      <div className="info-container">
        <div className="level-container">
          <h2>Level</h2>
          <div className="buttons-container">
            <button
              className={classNames("level-reduce", {
                visibilityHidden: level <= 1,
              })}
              onClick={() =>
                setLevel((prevState) => prevState - 1)
              }
            >
              <AiOutlineMinus size={24} />
            </button>
            <p>{level}</p>
            <button
              className={classNames("level-add", {
                visibilityHidden: level >= 10,
              })}
              onClick={() =>
                setLevel((prevState) => prevState + 1)
              }
            >
              <AiOutlinePlus size={24} />
            </button>
          </div>
        </div>

        <div className="itens-container">
          <h2>Item</h2>
          <div className="buttons-container">
            <button
              className="itens-reduce"
              onClick={() =>
                setItem((prevState) => prevState - 1)
              }
            >
              <AiOutlineMinus size={24} />
            </button>
            <p>{item}</p>
            <button
              className="itens-add"
              onClick={() =>
                setItem((prevState) => prevState + 1)
              }
            >
              <AiOutlinePlus size={24} />
            </button>
          </div>
        </div>
        <div className="itens-container">
          <h2>Bonus</h2>
          <div className="buttons-container">
            <button
              className="itens-reduce"
              onClick={() =>
                setBonus((prevState) => prevState - 1)
              }
            >
              <AiOutlineMinus size={24} />
            </button>
            <p>{bonus}</p>
            <button
              className="itens-add"
              onClick={() =>
                setBonus((prevState) => prevState + 1)
              }
            >
              <AiOutlinePlus size={24} />
            </button>
          </div>
        </div>

        <div className="gold-container">
          <h2>Gold</h2>
          <div className="buttons-container">
            <button
              className="gold-reduce"
              onClick={() =>
                setGold((prevState) => prevState - 100)
              }
            >
              <AiOutlineMinus size={24} />
            </button>
            <p>{gold}</p>
            <button
              className="gold-add"
              onClick={() =>
                setGold((prevState) => prevState + 100)
              }
            >
              <AiOutlinePlus size={24} />
            </button>
          </div>
          {level <= 8 && gold >= 1000 && (
            <button
              onClick={handleLevelUp}
              className="level-up"
              style={{ margin: "24px auto", fontSize: 18 }}
            >
              Level Up
              <BsFillArrowUpSquareFill />
            </button>
          )}
        </div>
      </div>
      <div className="total-strength__container">
        {String(level + item + bonus).padStart(2, "0")}
        <img
          className="user-image"
          src={userImage}
          alt=""
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};
export default Home;
