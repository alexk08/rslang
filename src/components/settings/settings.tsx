import React from "react";
import { connect } from 'react-redux';
import { toggleButtons, toggleTranslate, toggleOpen } from "../../common/redux/action";

interface SettingsProps {
  isOpen: any,
  isTranslate: boolean,
  areButtons: boolean,
  toggleTranslate: any,
  toggleButtons: any,
  toggleOpen: any,
}

const SettingsRedux: React.FC<SettingsProps> = ({ isOpen, areButtons, isTranslate, toggleOpen, toggleTranslate, toggleButtons }) => {
  return (isOpen &&
    <div className="over-settings" onClick={() => {
      toggleOpen(false)
    }}>
      <div className="settings" onClick={(e) => e.stopPropagation()}>
        <img src='/images/close.svg' alt="close" onClick={() => toggleOpen(false)} />
        <p>Настройки:</p>
        <form>
          <label>
            <input
              type="checkbox"
              checked={isTranslate}
              onChange={toggleTranslate} />
            Показывать перевод
          </label>
          <label>
            <input
              type="checkbox"
              checked={areButtons}
              onChange={toggleButtons} />
            Возможность добавить в Сложные или Удаленные слова
          </label>
        </form>
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  isTranslate: state.setting.isTranslate,
  areButtons: state.setting.areButtons,
  isOpen: state.setting.isOpen,
});

const mapDispatchToProps = {
  toggleButtons,
  toggleTranslate,
  toggleOpen
};

const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsRedux);

export { Settings };
