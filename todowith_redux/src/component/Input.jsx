import React, { useState } from "react";
import "./Input.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  updateList,
  deleteTodo,
  removeAllTodo,
} from "./../actions/actionPerformer";
import { MdOutlineModeEditOutline, MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSave } from "react-icons/bi";

const Input = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.totoReducer.list);

  const [editedData, setEditedData] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [inputTxt, setInputTxt] = useState("");

  const [errorMsg, setErrorMsg] = useState("Add new");

  const [selectedItems, setSelectedItems] = useState([]);

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
      <div className="container h-100">
        <div className="">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{ backgroundColor: "white" }}
            >
              <div className="card-body py-4 px-4 px-md-5">
                <div className="pb-2">
                  <div className="card" style={{ backgroundColor: "white" }}>
                    <div className="card-body">
                      <div className="d-flex flex-row align-items-center">
                        <input
                          style={{ backgroundColor: "white", color: "black" }}
                          type="text"
                          name="inputTxt"
                          placeholder={errorMsg}
                          value={inputTxt}
                          onChange={(e) => setInputTxt(e.target.value)}
                          className="form-control form-control-lg"
                          id="exampleFormControlInput1"
                        />

                        <div>
                          <button
                            type="button"
                            onClick={handleAddTask}
                            className="btn btn-primary"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                  <p className="small mb-0 me-2 text-muted">Filter</p>
                  <select className="select">
                    <option value="1">All</option>
                    <option value="2">Completed</option>
                    <option value="3">Active</option>
                    <option value="4">Has due date</option>
                  </select>
                  <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                  <select className="select">
                    <option value="1">Added date</option>
                    <option value="2">Due date</option>
                  </select>
                </div>

                {list.map((elem) => {
                  return (
                    <ul
                      key={elem.id}
                      className="list-group list-group-horizontal rounded-0  "
                      style={{ borderBottom: "1px solid" }}
                    >
                      <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                        <div className="form-check">
                          <input
                            className="form-check-input me-0"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked1"
                            aria-label="..."
                            checked={selectedItems.includes(elem.id)}
                            onChange={() => handleCheckboxChange(elem.id)}
                          />
                        </div>
                      </li>
                      <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                        {editMode && elem.id === editedData.id ? (
                          <input
                            type="text"
                            name="inputTxt"
                            placeholder="Edit..."
                            value={
                              editedData.id === elem.id
                                ? editedData.data
                                : elem.data
                            }
                            onChange={(e) => {
                              if (editedData.id === elem.id) {
                                setEditedData({
                                  ...editedData,
                                  data: e.target.value,
                                });
                              }
                            }}
                          />
                        ) : (
                          <p className="lead fw-normal mb-0">{elem.data}</p>
                        )}
                      </li>
                      <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                        {!editMode ? (
                          <div className="d-flex flex-row justify-content-end mb-1">
                            <a
                              href="#!"
                              className="text-info me-3"
                              data-mdb-toggle="tooltip"
                              title="Edit todo"
                              onClick={() => {
                                setEditMode(true);
                                setEditedData(elem);
                              }}
                            >
                              <MdOutlineModeEditOutline />
                            </a>

                            <a
                              href="#!"
                              className="text-danger ms-3"
                              data-mdb-toggle="tooltip"
                              title="Delete todo"
                              onClick={() => dispatch(deleteTodo(elem.id))}
                            >
                              <RiDeleteBin6Fill />
                            </a>
                          </div>
                        ) : (
                          <>
                            {" "}
                            <div className="d-flex flex-row justify-content-end mb-1">
                              <a
                                href="#!"
                                className="text-info me-3"
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
                                <BiSave />{" "}
                              </a>
                              <a
                                href="#!"
                                className="text-danger ms-3"
                                data-mdb-toggle="tooltip"
                                title="Delete todo"
                                onClick={() => {
                                  setEditedData("");
                                  setEditMode(false);
                                }}
                              >
                                <MdOutlineCancel />
                              </a>
                            </div>
                          </>
                        )}
                        <div className="text-end text-muted">
                          <a
                            href="#!"
                            className="text-muted"
                            data-mdb-toggle="tooltip"
                            title="Created date"
                          >
                            <p className="small mb-0">
                              <i className="fas fa-info-circle me-2"></i>
                              {elem.date}
                            </p>
                          </a>
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
    </section>
  );
};

export default Input;
