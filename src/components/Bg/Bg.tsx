import styles from "./Bg.module.scss";

import mobileTop from "../../images/auth/mobile-top.png";
import tabletBig from "../../images/auth/tablet-big.png";
import desktopBig from "../../images/auth/desktop-big.png";
import mobileDown from "../../images/auth/mobile-bottom.png";
import desktopTabletSmall from "../../images/auth/desktop-tablet-small.png";

export const Bg = () => {
  return (
    <div>
      <div className={styles.bg_rect}></div>
      <picture>
        <source srcSet={desktopBig} media="(min-width: 1280px)" />
        <source srcSet={tabletBig} media="(min-width: 768px)" />
        <source srcSet={mobileTop} media="(max-width: 767px)" />
        <img className={styles.top} alt="bg" src={mobileTop} />
      </picture>
      <picture>
        <source srcSet={desktopTabletSmall} media="(min-width: 1280px)" />
        <source srcSet={desktopTabletSmall} media="(min-width: 768px)" />
        <source srcSet={mobileDown} media="(max-width: 767px)" />
        <img className={styles.bottom} alt="bg" src={mobileDown} />
      </picture>
    </div>
  );
};
