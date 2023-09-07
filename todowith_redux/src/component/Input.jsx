import React, { useState, useEffect } from "react";
import "./Input.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  updateList,
  deleteTodo,
  removeAllTodo,
} from "./../actions/actionPerformer";
import { CgCalendarDates } from "react-icons/cg";
import { GrStatusGoodSmall } from "react-icons/gr";

const Input = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.totoReducer.list);

  const [editedData, setEditedData] = useState("");

  const [editMode, setEditMode] = useState(null);

  const [inputTxt, setInputTxt] = useState("");

  const [errorMsg, setErrorMsg] = useState("Add new");

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterType, setFilterType] = useState(null);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // console.log("filter type", filterType)
    if (filterType === "Done" || filterType === "Pending") {
      // console.log("if part")
      const filteredList = list.filter((elem) => elem.status === filterType);
      setFilteredData(filteredList);
    } else {
      // console.log("else")
      setFilteredData(list);
    }
  }, [list, filterType]);

  // console.log("List", list);
  // console.log("filteredData", filteredData);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(list.map((elem) => elem.id));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, list]);

  const handleAddTask = () => {
    if (inputTxt) {
      dispatch(addTodo(inputTxt));
      setInputTxt("");
    } else {
      const timer = setTimeout(() => {
        setErrorMsg("Please Add a Task First");
      });
      return () => clearTimeout(timer);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <section className="">
      <div className="">
        <div className="">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{
                backgroundColor: "#323232",
                borderColor: "#616464",
                color: "white",
              }}
            >
              <div className="card-body py-md-4 px-md-4 px-md-5">
                <div className="">
                  <div
                    className="card"
                    style={{
                      backgroundColor: "#323232",
                      borderColor: "#616464",
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex flex-row align-items-center text-light">
                        <input
                          // style={{ backgroundColor: "#323232", color: "red"}}
                          type="text"
                          name="inputTxt"
                          placeholder={errorMsg}
                          value={inputTxt}
                          onChange={(e) => setInputTxt(e.target.value)}
                          className="main-input"
                          id="exampleFormControlInput1"
                        />

                        <button
                          className="button"
                          onClick={handleAddTask}
                          type="button"
                        >
                          <span
                            style={{ fontSize: "12px" }}
                            className="button__text"
                          >
                            Add Todo
                          </span>
                          <span className="button__icon">
                            <svg
                              className="svg"
                              fill="none"
                              height="24"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line x1="12" x2="12" y1="5" y2="19"></line>
                              <line x1="5" x2="19" y1="12" y2="12"></line>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <div className="form-check d-flex justify-content-between mb-2 ">
                  <span className="d-flex flex-row">
                    <input
                      style={{
                        backgroundColor: "#323232",
                      }}
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="selectAllCheckbox"
                      aria-label="..."
                      checked={selectAll}
                      onChange={() => setSelectAll(!selectAll)}
                    />

                    <p className="small mb-0 me-2 text-light ">Select All</p>
                    <button
                      onClick={() => dispatch(removeAllTodo(selectedItems))}
                      className="bin"
                    >
                      🗑
                    </button>
                  </span>
                  <span className="form-check d-flex justify-content-between align-items-center ">
                    <p className="small mb-0 me-2 text-light">Filter</p>
                    <select
                      style={{
                        background: "gray",
                        border: "0",
                        borderRadius: "5px",
                      }}
                      className="select"
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Done">Done</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </span>
                </div>
                <div
                  className="output"
                 
                >
                <hr className="my-4" />

                  {filteredData.map((elem, index) => {
                    return (
                      <ul
                        key={elem.id}
                        className="list-group list-group-horizontal rounded-0 d-flex flex-column flex-md-row "
                        style={{
                          borderBottom: "1px solid",
                          paddingLeft: "6px",
                          paddingRight: "6px",
                        }}
                      >
                        <li className="list-group-item d-md-flex align-items-center ps-md-0 pe-md-3 py-1 rounded-0 border-0 bg-transparent d-none text-wrap">
                          <div className="form-check">
                            <input
                            style={{backgroundColor: "rgb(50, 50, 50)"}}
                              className="form-check-input me-0 none "
                              type="checkbox"
                              value=""
                              id="flexCheckChecked1"
                              aria-label="..."
                              checked={selectedItems.includes(elem.id)}
                              onChange={() => handleCheckboxChange(elem.id)}
                            />
                          </div>
                        </li>
                        <li
                          
                          className="first-list list-group-item px-md-3 py-md-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
                        >
                          {editMode === index && elem.id === editedData.id ? (
                            <div className="input">
                              <input
                                className="inputttt input-alt"
                                style={{
                                  width: "100%",
                                  border: "0",
                                  backgroundColor: "#323232",
                                  paddingRight: "100px",
                                }}
                                type="text"
                                name="inputTxt"
                                placeholder="Edit..."
                                value={
                                  editedData.id === elem.id
                                    ? editedData.todo
                                    : elem.todo
                                }
                                onChange={(e) => {
                                  if (editedData.id === elem.id) {
                                    setEditedData({
                                      ...editedData,
                                      todo: e.target.value,
                                    });
                                  }
                                }}
                              />
                              <span className="input-border input-border-alt"></span>
                              {editMode === index ? (
                                <select
                                  className="selectt d-flex flex-nowrap"
                                  value={editedData.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value;
                                    setEditedData({
                                      ...editedData,
                                      status: newStatus,
                                    });
                                  }}
                                >
                                  <option value="Done">Done</option>
                                  <option value="Pending">Pending</option>
                                </select>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <p className=" p-text lead text-light justified-text fs-6 fw-normal mb-0">
                              {elem.todo}
                            </p>
                          )}
                        </li>
                        <li className=" second-list list-group-item  pe-0 py-1 rounded-0 border-0 bg-transparent">
                          {editMode === index ? (
                            <>
                              {" "}
                              <div className="d-flex flex-row justify-content-end   mb-1">
                                <a
                                  href="#!"
                                  className="text-info me-3 fs-4"
                                  data-mdb-toggle="tooltip"
                                  title="Edit todo"
                                  onClick={() => {
                                    if (editedData.id === elem.id) {
                                      dispatch(updateList(editedData));
                                      setEditMode(false);
                                    }
                                  }}
                                > 
                                  {" "}
                                  <lord-icon
                                    src="https://cdn.lordicon.com/jvihlqtw.json"
                                    trigger="loop"
                                    delay="3000"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      fontWeight: 900,
                                    }}
                                  ></lord-icon>
                                </a>
                                <a
                                  href="#!"
                                  className="text-danger ms-3 fs-4"
                                  data-mdb-toggle="tooltip"
                                  title="Delete todo"
                                  onClick={() => {
                                    setEditedData("");
                                    setEditMode(false);
                                  }}
                                >
                                  <lord-icon
                                    src="https://cdn.lordicon.com/rivoakkk.json"
                                    trigger="loop"
                                    delay="3000"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      fontWeight: 900,
                                    }}
                                  ></lord-icon>
                                </a>
                              </div>
                            </>
                          ) : (
                            <div className="d-flex flex-row  justify-content-end mb-1">
                              <a
                                href="#!"
                                className="text-info me-3 fs-4"
                                data-mdb-toggle="tooltip"
                                title="Edit todo"
                                onClick={() => {
                                  setEditMode(index);
                                  setEditedData(elem);
                                }}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/wloilxuq.json"
                                  trigger="loop"
                                  delay="2000"
                                  colors="primary:#121331,secondary:#08a88a"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    fontWeight: 900,
                                  }}
                                ></lord-icon>
                              </a>

                              <a
                                href="#!"
                                className="text-danger ms-3 fs-4"
                                data-mdb-toggle="tooltip"
                                title="Delete todo"
                                onClick={() => dispatch(deleteTodo(elem.id))}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/gsqxdxog.json"
                                  trigger="loop"
                                  delay="3000"
                                  colors="primary:#121331,secondary:#08a88a"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    fontWeight: 900,
                                  }}
                                ></lord-icon>
                              </a>
                            </div>
                          )}
                          <div className="text-end text-muted d-flex flex-row gap-5 justify-content-end">
                            {!editMode ? (
                              <p
                                className=" d-flex flex-row gap-2 align-items-center "
                                style={{
                                  color:
                                    elem.status === "Pending"
                                      ? "#bc1414"
                                      : "#178f17",
                                  fontSize: "14px",
                                  width: "72.25px"
                                }}
                              >
                                <GrStatusGoodSmall />
                                {elem.status}
                              </p>
                            ) : (
                              ""
                            )}

                            <p
                              className=" d-flex flex-row gap-2 align-items-center text-light "
                              style={{ fontSize: "14px" }}
                            >
                              <CgCalendarDates /> {elem.date}
                            </p>
                          </div>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Input;
