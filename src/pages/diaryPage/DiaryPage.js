import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import axios from "axios";
import ProductForm from "../../components/productForm/ProductForm";
import "./react-datapicker.css";
import sprite from "../../images/sprite.svg";
import { endpoint } from "../../db.json";
import {
  addEatenProduct,
  deleteProduct,
  getDayInfo,
} from "../../redux/user/userOperations";
import EatenProductsList from "../../components/eatenProductsList/EatenProductsList";
import getDateInFormat from "../../services/getDateInFormat";
import { getDayId, getEatenProductsList } from "../../redux/user/userSelectors";
import CalloriesText from "../../components/calloriesText/CalloriesText";
import { setDiaryValue } from "../../redux/isOpenModalForDiaryMobilePage/diaryModalAction";
import Modal from "../../components/modal";
import { DiaryPageStyled } from "./DiaryPageStyles";

const DiaryPage = () => {
  const dayId = useSelector(getDayId);
  const [errorMsg, setErrorMsg] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const isModalOpen = useSelector((state) => state.diaryModal.isOpenModal);

  const dispatch = useDispatch();
  const onHandleCliсk = () => dispatch(setDiaryValue());

  const [productName, setProductName] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productsVariants, setProductsVariants] = useState([]);
  const eatenProductsList = useSelector(getEatenProductsList);

  useEffect(() => {
    const date = getDateInFormat(startDate);
    dispatch(getDayInfo(date));
  }, [dispatch, startDate]);

  useEffect(() => {
    productName &&
      axios(`${endpoint.product}${productName}`)
        .then(({ data }) => {
          const variantsList = data.slice(0, 20);
          setProductsVariants(variantsList);
        })
        .catch((error) => {
          error.response.status === 400
            ? setErrorMsg("Такого продукта в базе нет")
            : setErrorMsg("Ой! Что-то пошло не так :(");
        });
  }, [productName]);

  const isCurrentDay =
    getDateInFormat(startDate) === getDateInFormat(new Date());

  const handleChange = ({ name, value }) => {
    name === "productName" && setProductName(value);
    name === "productWeight" && setProductWeight(value);
  };

  const handleSubmit = () => {
    const curProd = productsVariants.find(
      (prod) => prod.title.ru === productName
    );
    if (!curProd) {
      setErrorMsg(
        "Выбирети продукт из предложенного списка или введите заново"
      );
      return;
    }
    const productId = curProd._id;
    const weight = Math.round(productWeight);
    const date = getDateInFormat(startDate);

    dispatch(addEatenProduct({ date, productId, weight }));
    dispatch(getDayInfo(date));
  };

  const handleClick = (eatenProductId) => {
    console.log({ dayId, eatenProductId });
    // dispatch(deleteProduct({ dayId, eatenProductId }));
  };

  return (
    <>
      <DiaryPageStyled>
      <div className={"dataPicker__box"}>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <svg className="dataPicker__svg" width="18" height="20">
          <use href={sprite + "#calendar"} />
        </svg>
      </div>

      {isCurrentDay && (
        <ProductForm
          productName={productName}
          productWeight={productWeight}
          productsVariants={productsVariants}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errorMsg={errorMsg}
        />
      )}
      <div className="diaryFlexBox">
      <EatenProductsList
        eatenProductsList={eatenProductsList}
        isCurrentDay={isCurrentDay}
        handleClick={handleClick}
      />
        <CalloriesText />
      </div>
      </DiaryPageStyled>
      <button type="button" onClick={onHandleCliсk}>
        openModal
      </button>
      {isModalOpen && (
        <Modal hideModal={onHandleCliсk} showModal={onHandleCliсk}>
          <ProductForm
            productName={productName}
            productWeight={productWeight}
            productsVariants={productsVariants}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errorMsg={errorMsg}
          />
        </Modal>
      )}
    </>
  );
};

export default DiaryPage;
