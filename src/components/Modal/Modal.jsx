import { useDispatch } from "react-redux";
import { setIsModalOpen } from "../../redux/features/playlist/playlistSlice";

const Modal = ({ action, actionHandler }) => {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(setIsModalOpen(false));
  };
  const clickActionHandler = () => {
    dispatch(actionHandler());
    dispatch(setIsModalOpen(false));
  };
  return (
    <div className="modal z-index">
      <div className="modal-content padding-sm flex-spbt">
        <div>Are you Sure?</div>
        <button className="modal-close">
          <i className="fas fa-times-square" onClick={closeModalHandler}></i>
        </button>
      </div>
      <div className="modal-body padding-sm">
        <div>
          This will clear all the videos from History. Do you want to proceed?
        </div>
      </div>
      <div className="modal-footer padding-sm">
        <button
          className="modal-footer-close padding-xs modal-footer-btn"
          onClick={closeModalHandler}
        >
          Close
        </button>
        <button
          className="footer-submit padding-xs modal-footer-btn"
          onClick={clickActionHandler}
        >
          {action}
        </button>
      </div>
    </div>
  );
};
export { Modal };
