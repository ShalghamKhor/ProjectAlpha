import React from "react";
import styles from "./global/firstSection.module.css";

export function FirstSection() {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.backgroundSlider}>
        <div className={`${styles.slide} ${styles.slide1}`}></div>
        <div className={`${styles.slide} ${styles.slide2}`}></div>
      </div>
      
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          Välkommen till Vår Delningsplattform
        </h1>
        <p className={styles.description}>
          Vår plattform hjälper dig att låna ut och låna saker i efterbehov, 
          vilket skapar en bättre ekonomi för alla samtidigt som vi minskar 
          avfallet och vår påverkan på miljön. Genom att dela resurser istället 
          för att köpa nya produkter bidrar vi till en mer hållbar framtid.
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.btnContact}>Kontak oss</button>
          <button className={styles.btnService}>Tjänster</button>
        </div>
      </div>
    </section>
  );
}