import styles from "./BackgroundSelector.module.css";
// 배경 이미지 import
import img1 from "../../../../assets/images/backgroundJournal/background0.png";
import img2 from "../../../../assets/images/backgroundJournal/background1.png";
import img3 from "../../../../assets/images/backgroundJournal/background2.png";
import img4 from "../../../../assets/images/backgroundJournal/background3.png";
import icBgSelected from "../../../../assets/icons/ic_bg_selected.svg";
const backgrounds = [
  { img: img1 },
  { img: img2 },
  { img: img3 },
  { img: img4 },
  { color: "#FCF4DD" },
  { color: "#DAEAF6" },
  { color: "#FCE1E4" },
  { color: "#DDEDEA" },
];
export const BackgroundSelector = ({ selected, onSelect }) => {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.label}>배경을 선택해주세요</div>
      <div className={styles.backgroundGrid}>
        {backgrounds.map((bg, idx) => (
          <div
            key={idx}
            className={`${styles.backgroundItem} ${
              selected === idx ? styles.selected : ""
            }`}
            style={bg.color ? { background: bg.color } : {}}
            onClick={() => onSelect(idx)}
          >
            {bg.img && (
              <img
                src={bg.img}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            {selected === idx && (
              <img
                src={icBgSelected}
                alt="선택됨"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 40,
                  height: 40,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
