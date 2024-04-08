import React from 'react';
import { ModalInfo } from '../../types/ModalInfo';
import './Modal.scss';

export const Modal: React.FC<ModalInfo> = ({ isOpen, onClose, text }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal__content">
          <span
            className="modal__close"
            onClick={() => onClose()}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === 'Space') {
                onClose();
              }
            }}
          >
            &times;
          </span>

          <h3 className="title title--h3">{text?.title}</h3>

          {text?.description?.split('\n').map(line => (
            <li key={line} className="modal__description">
              {line.trim()}
            </li>
          ))}
        </div>
      </div>
    )
  );
};

/*  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 && npm run lint-css", */
