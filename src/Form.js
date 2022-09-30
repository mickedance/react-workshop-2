import axios from "axios";
import React, {  useState } from "react";
import { useForm } from "react-hook-form";

const Form = (props) => {
  const [formPerson, setFormPerson] = useState({});
  const [alert, setAlert] = useState({});
  let initalPerson = null;
  if (props.person != null) {
    initalPerson = {
      id: props.person.id,
      email: props.person.email,
      firstName: props.person.firstName,
      lastName: props.person.lastName,
      title: props.person.title,
    };
  }
  const [person, setPerson] = useState(initalPerson);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: person });
  const handleForm = (data) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    //update person
    if (props.person != null) {
      axios
        .put(baseUrl, data)
        .then((response) => {
          if (response.status === 204) {
            setAlert({ successMessage: "Updated" });
            setTimeout(() => {
              setAlert({});
              props.fetchDataFromDB();
              props.showForm(response.data.id);
            }, 750);
          } else {
            setAlert({ errorMessage: "DB connection failed" });
            setTimeout(() => {
              setAlert({});
            }, 750);
          }
        })
        .catch((e) => {
            console.log(e.response.data)
          setAlert({ errorMessage: "Unknown error" + e.response.data.statusText });
        });
      //Add new Person
    } else if (props.person == null) {
      console.log("add person");
      axios.post(baseUrl, data).then((response) => {
        console.log(response);

        if (response.status === 201) {
          setAlert({ successMessage: "Person added" });
          setTimeout(() => {
            onReset();
            setAlert({});
          }, 750);
        }
      }).catch((e)=>{
            setAlert({ errorMessage: e.response.data.statusText });
            setTimeout(() => {
                setAlert({});
          }, 1500);
      });
    }
  };
  const onReset = () => {
    console.log("reset");
    if (props.person == null) {
      setPerson({});
      setValue("firstName", null );
      setValue("lastName", null);
      setValue("email", null);
      setValue("title", null);
    } else if (props.person != null) {
      console.log("set inital");
      setValue("firstName", props.person.firstName);
      setValue("lastName", props.person.lastName);
      setValue("email", props.person.email);
      setValue("title", props.person.title);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{ marginTop: "25px" }}>
        <div className="col-6 offset-2">
          <div style={{ padding: "4px", background: "grey" }}>
            <div className="text-center ">
              {" "}
              <h3>Person</h3>
            </div>
          </div>

          <form
            className="border"
            style={{ padding: "20px" }}
            onSubmit={handleSubmit(handleForm)}
          >
            <div className="form-group">
              <input hidden {...register("id")}></input>
              <input
                {...register("email", {
                  minLength: { value: 6, message: "To short email" },
                  required: { value: true, message: "Email required" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email",
                  },
                })}
                type="text"
                className="form-control"
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="text-danger"> {errors.email.message} </span>
              )}
            </div>
            <div className="form-group">
              <label></label>
              <input
                {...register("firstName", {
                  required: { value: true, message: "Name Required" },
                  minLength: { value: 4, message: "Min 4 char long" },
                  maxLength: { value: 60, message: "To long" },
                })}
                type="text"
                className="form-control"
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <span className="text-danger">{errors.firstName.message} </span>
              )}
            </div>
            <div className="form-group">
              <label></label>
              <input
                {...register("lastName", {
                  required: { value: true, message: "Last name is required" },
                  minLength: { value: 4, message: "To Short name" },
                  maxLength: { value: 40, message: "To Long" },
                })}
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
              />
              {errors.lastName && (
                <span className="text-danger"> {errors.lastName.message} </span>
              )}
            </div>
            <div className="form-group">
              <label></label>
              <input
                {...register("title", {
                  required: { value: true, message: "Title is required" },
                  minLength: { value: 3, message: "To short" },
                  maxLength: { value: 40, message: "to long" },
                })}
                type="text"
                className="form-control"
                placeholder="Enter Title"
              />
              {errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </div>
            <div>
              <label></label>
            </div>
            <button type="submit" className="btn btn-success btn-sm">
              {props.person == null ? "Add Person" : "Update"}
            </button>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => {
                onReset();
              }}
              type="button"
              className="btn-sm btn btn-warning text-light"
            >
              Reset
            </button>
            {props.person &&<button
              style={{ marginLeft: "60px" }}
              onClick={() => {
                props.showForm(props.person.id);
              }}
              type="button"
              className="btn-sm btn btn-primary text-light"
            >
              Close
            </button>}
            <div style={{ marginTop: "20px" }}>
              {alert != null && alert.successMessage && (
                <span className="alert alert-success">
                  {alert.successMessage}
                </span>
              )}
              {alert != null && alert.errorMessage && (
                <span className="alert alert-warning">
                  {alert.errorMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
