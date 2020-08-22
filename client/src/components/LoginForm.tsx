import React from 'react'
import {useFormik} from "formik"

interface ILoginForm {
    loading: boolean,
    onLogin: (email: string, password: string) => void
}

export const LoginForm: React.FC<ILoginForm> = ({loading, onLogin}) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            onLogin(values.email, values.password)
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
                <button type="submit" className="btn btn-primary">
                    {loading &&
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    }
                    Sign in
                </button>
        </form>
    )
}