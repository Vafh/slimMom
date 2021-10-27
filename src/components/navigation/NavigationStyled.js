import styled from "styled-components";

export const NavigationStyled = styled.nav`
  margin: 0 15px;
  font-weight: bold;

  .nav {
    &__list {
      display: flex;
      list-style: none;

      margin: 0;
      padding: 0;
    }

    &__list-for-modal {
      display: flex;
      list-style: none;
      flex-direction: column;
      text-align: center;

      margin: 0;
      padding: 60px 0 0 0;
    }

    &__item {
      &:not(:first-child) {
        padding-left: 15px;
      }
    }

    &__item-for-modal {
      &:last-child {
        padding-top: 40px;
      }
    }

    &__link {
      text-decoration: none;
      text-transform: uppercase;

      color: #9b9faa;
      font-size: 14px;
      font-weight: 700;
    }

    &__link-for-modal {
      text-decoration: none;
      text-transform: uppercase;

      color: #fff;

      font-family: Verdana;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    &__link-active {
      color: #212121;
    }

    &__link-active-for-modal {
      color: #9b9faa;
    }
  }

  @media screen and (min-width: 768px) {
    .nav {
      &__list-for-modal {
        padding: 108px 0 0 0;
      }
      &__item-for-modal {
        &:last-child {
          padding-top: 20px;
        }
      }
      &__link-for-modal {
        font-size: 24px;
        line-height: 29px;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    margin: 0;
    padding-left: 22px;
  }
`;
