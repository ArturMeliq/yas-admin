import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import classes from './table.module.scss';
import Pagination from '../Pagination/Pagination';
import Checkbox from '../Form/Checkbox/Checkbox';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Button from '../Form/Button/Button';
import Input from '../Form/Input/Input';

const Table = ({
  header, data, tableTitle, hidePagination, showLoading, page, pageCount,
  onPageChange, classNameTHeader, currentShowDate,
}) => {
  const [modalInfo, setModalInfo] = useState({});

  return (
    <div className={classes.table_wrapper}>
      {tableTitle
        && <h2 className={classes.table_title}>{tableTitle}</h2>}

      {showLoading
        ? (
          <div className={classes.isLoader}>
            <Loader />
          </div>
        )
        : (
          <>
            <div className={classes.table_main_wrapper}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    {header.map(({
                      title, width, minWidth, maxWidth, fontSize,
                    }) => (
                      <th
                        className={`${classNameTHeader}`}
                        key={title}
                        style={
                        {
                          width: width || 'auto',
                          minWidth: minWidth || 'auto',
                          maxWidth: maxWidth || 'auto',
                          fontSize: fontSize || 20,
                        }
}
                      >
                        {title === 'Checkbox'
                          ? <Checkbox onChange={() => {}} />
                          : title}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data?.map((d) => {
                    const allowDate = ['createdAt', 'date'];
                    return (
                      <tr key={d.id}>
                        {header.map(({
                          Icon, title, path, width, minWidth, maxWidth, modalData, label,
                          onClick, color, showMore, statuses, fontSize,
                        }) => {
                          const findStatus = statuses?.find((s) => +s.order === +d.status);
                          return (
                            <td
                              style={{
                                minWidth: minWidth || 'auto',
                                maxWidth: maxWidth || 'auto',
                                width: width || 'auto',
                                fontSize: fontSize || 20,
                              }}
                              key={title}
                            >
                              {Icon
                                ? (
                                  <div
                                    className={classes.control_icons}
                                    onClick={() => {
                                      if (modalData) {
                                        setModalInfo({
                                          ...modalData,
                                          title,
                                          id: d.id,
                                          value: d?.name,
                                        });
                                      } else if (label) {
                                        onClick(d.id, d.status);
                                      }
                                    }}
                                  >
                                    <Icon fill={color || ''} className={classes.icon} />
                                    {!!label && <span style={{ fontSize: fontSize || 20 }}>{label}</span>}
                                  </div>
                                )

                                : label ? (
                                  <div
                                    className={classes.control_icons}
                                    onClick={() => onClick(d.id)}
                                  >
                                    {label}
                                  </div>
                                )

                                  : showMore ? (
                                    <>
                                      <p className={`${classes.show_more_text}
                                 ${+d.id === +currentShowDate.id && currentShowDate.path === path ? classes.show_more : ''}`}
                                      >
                                        {d[path]}
                                      </p>

                                      {!(+d.id === +currentShowDate.id && currentShowDate.path === path)
                                        && (
                                          <Button
                                            onClick={() => onClick(d.id, path)}
                                            className={classes.show_more_btn}
                                          >
                                            {showMore}
                                          </Button>
                                        )}
                                    </>
                                  )

                                    : title === 'Checkbox'
                                      ? (
                                        <Checkbox onChange={() => {
                                        }}
                                        />
                                      )

                                      : allowDate.includes(path)
                                        ? moment(d[path])
                                          .format('DD.MM.YYYY')
                                        : path === 'date'
                                          ? moment(d[path])
                                            .format('DD.MM.YYYY')
                                          : path === 'status'
                                            ? <p style={{ color: findStatus?.color }}>{findStatus?.title}</p>
                                            : d[path]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {(!hidePagination && !!+pageCount) && (
              <Pagination
                onPageChange={onPageChange}
                className={classes.pagination_space}
                pageCount={+pageCount}
                page={page}
              />
            )}
          </>
        )}

      {!_.isEmpty(modalInfo) && (
        <Modal
          onClose={() => setModalInfo({})}
          show={!_.isEmpty(modalInfo)}
        >
          <p className={classes.modal_text}>{modalInfo.modalText}</p>

          <div className={classes.content_wrapper}>
            {modalInfo.title.toLowerCase() === 'edit'
              && (
              <Input
                value={modalInfo.value}
                onChange={(value) => {
                  setModalInfo((prevState) => ({
                    ...prevState,
                    value,
                  }));
                }}
              />
              )}

            <div className={classes.buttons_wrapper}>
              <Button
                className={classes.delete_verify_btn}
                onClick={() => {
                  modalInfo.onClick(modalInfo.id, modalInfo.value);
                  setModalInfo({});
                }}
              >
                {modalInfo.title}
              </Button>

              <Button
                className={classes.cancel_btn}
                onClick={() => setModalInfo({})}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

Table.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  tableTitle: PropTypes.string,
  classNameTHeader: PropTypes.string,
  hidePagination: PropTypes.bool,
  showLoading: PropTypes.bool,
  pageCount: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  currentShowDate: PropTypes.object,
};

Table.defaultProps = {
  tableTitle: '',
  hidePagination: false,
  showLoading: false,
  classNameTHeader: '',
  pageCount: 1,
  page: 1,
  onPageChange: () => {},
  currentShowDate: {},
};

export default Table;
