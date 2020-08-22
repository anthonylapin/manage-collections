import React from 'react'
import { useFormik } from 'formik'

interface ISignUpForm {
    loading: boolean,
    onRegister: (firstName: string, lastName: string, email: string, password: string) => void
}

export const RegisterForm: React.FC<ISignUpForm> = ({loading, onRegister}) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            onRegister(values.firstName, values.lastName, values.email, values.password)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    className="form-control"
                    name="password"
                    type="password"
                    autoComplete="on"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </div>
            <div className="row form-group">
                <div className="col">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        className="form-control"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                </div>
                <div className="col">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        className="form-control"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                </div>
            </div>
            <button className="btn btn-primary" disabled={loading} type="submit">
                {loading &&
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                }
                Sign up
            </button>
        </form>
    );
}