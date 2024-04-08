import './Gallery.scss';

export const Gallery = () => {
  return (
    <section className="gallery">
      <div className="gallery__content content">
        <div className="gallery__info">
          <h4 className="gallery__label">Галерея</h4>

          <h2 className="gallery__title">
            Якість та
            <br />
            естетичність
          </h2>

          <p className="gallery__description">
            Наші роботи не залишать вас байдужими.
          </p>
        </div>

        <div className="gallery__grid">
          <img
            className="gallery__grid-item gallery__grid-item--01"
            src="./img/gallery/01.png"
            alt="textiles-1"
          />
          <img
            className="gallery__grid-item gallery__grid-item--02"
            src="./img/gallery/02.png"
            alt="textiles-2"
          />
          <img
            className="gallery__grid-item gallery__grid-item--03"
            src="./img/gallery/03.png"
            alt="textiles-3"
          />
          <img
            className="gallery__grid-item gallery__grid-item--04"
            src="./img/gallery/04.png"
            alt="textiles-4"
          />
          <img
            className="gallery__grid-item gallery__grid-item--05"
            src="./img/gallery/05.png"
            alt="textiles-5"
          />
        </div>
      </div>
    </section>
  );
};
