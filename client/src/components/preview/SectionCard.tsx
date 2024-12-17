import React from "react";
import { useNavigate } from "react-router-dom";
import css from '../preview/SectionCard.module.css'

interface SectionCardProps {
  title: string;
  image: string;
  redirectPath: string;
}

const SectionCard = ({ title, image, redirectPath }: SectionCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectPath);
  };

  return (
    <div className={css.sectionCard}  onClick={handleClick}>
      <img src={image} alt={title} className={css.cardImage} />
      <div className={css.overlay}>
        <h2 className={css.title}>{title}</h2>
      </div>
    </div>
  );
};

export default SectionCard;
