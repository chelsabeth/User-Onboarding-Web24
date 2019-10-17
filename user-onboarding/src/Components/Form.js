import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { withFormik, Form, Field } from "formik";

const UserForm = ({ values, errors, touched, status }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }, [status])

    return (
        <div className="user-form">
          <Form>
            <label>
                Name: 
                {/* labels for accessibility */}
                <Field type="text" name="name" placeholder="name" /> 
                {touched.name && errors.name && ( <p className="error">{errors.name}</p>)} {/* error messages for the name field */}
            </label>

            <label> 
                Email:
                <Field type="text" name="email" placeholder="email" />
            </label>

            <label> Password: 
                <Field type="password" name="password" placeholder="password" />
                {touched.password && errors.password && ( <p className="error">{errors.password}</p>)} {/* error messages for the password field */}
            </label>

            <label>
                {/* stretch */}
                Role: 
                <Field component="select" name="role">
                    <option>Choose a role</option>
                    <option value="I'm a pro!">I'm a pro!</option>
                    <option value="Team Lead/Section Lead">Team Lead/Section Lead</option>
                    <option value="Student">Student</option>
                    <option value="Unicorn">Unicorn</option>
                    <option value="Wizard">Wizard</option>
                </Field>
            </label>

            <label>
                Terms Of Service
                <Field type="checkbox" name="terms" checked={values.terms}/>  {/* terms of service is a checkbox */}
            </label>

                <button>Submit!</button>  {/* sumbit button to send data to the server */}
        </Form>
        {user.map(users => ( // map through the user array
            <ul key={users.id}>
                <li>Name: {users.name}</li>
                <li>Email: {users.email}</li> 
                <li>Role: {users.role}</li> 
                {/* the list items make the name and email display on the screen, didn't want to display password because it is personal information :) */}
            </ul>
        ))}
    </div> 
)};


    const FormikUserForm = withFormik({
        mapPropsToValues({name, email, password, terms, role}) {  // make the props for the form
            return {
                name: name || "",
                email: email || "",
                password: password || "",
                terms: terms || false,
                role: role || ""
            };
        },

        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is a required field"), // set up a costum error message for my name and password fields
            password: Yup.string().required("password required")
        }),

        handleSubmit(values, {setStatus}) { // setStatus is coming from formik
            axios                                              
                .post(" https://reqres.in/api/users", values) // here is my axios call and my post so that the users display on the screen after they press the submit button :)
                .then(res => {
                    setStatus(res.data);
                    console.log("Here is your response!", res);
                })
                .catch(err => console.log("Sorry, an error has occured", err.res))
        }

    })(UserForm);
    console.log("This is the higher order component:", FormikUserForm); // console log my form

    export default FormikUserForm; 