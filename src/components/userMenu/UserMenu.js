import React from "react";
import sprite from "../../images/icons-header.svg";
import { useSelector, useDispatch } from "react-redux";
import { UserMenuStyled } from "./UserMenuStyled";
import { authLogout } from "../../redux/auth/authOperations";
import { getUserName } from "../../redux/auth/authSelectors";
import { useLocation } from "react-router-dom";

const UserMenu = ({ width }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname === "/diary";

  const isOpenModal = true;

  const onHandleClick = () => dispatch(authLogout());

  const userName = useSelector(getUserName);
  return (
    <UserMenuStyled>
      {width < 768 && path && isOpenModal && (
        <div>
          <svg className="user-menu__icon">
            <use href={sprite + "#icon-arrow"} />
          </svg>
        </div>
      )}
      <div className="user-menu__text-wrap">
        <p className="user-menu__text">{userName}</p>
        <button className="user-menu__button" onClick={onHandleClick}>
          Выйти
        </button>
      </div>
    </UserMenuStyled>
  );
};

export default UserMenu;