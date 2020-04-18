import React, {useState, useEffect} from "react"
import {Link, Route, Switch, Redirect} from "react-router-dom"
import {useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import Calculator from "./Calculator"
import PageNotFound from "../errors/PageNotFound"

import {createStyles, makeStyles} from '@material-ui/core/styles';

import {
    addTitle,
    closeSnackbar,
    enqueueSnackbar,
} from "../actions/actionCreator";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            width: "100%",
            background: "#FFFFFF",
            flexDirection: "column",
        },
        header: {
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            color: "#879196",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "35px",
            margin: "20px 0",
        },
        body: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            minHeight: "150px",
        }
    })
);

export default function Main() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const app = useSelector(store => store.app);

    useEffect(() => {
        dispatch(addTitle("Процентный калькулятор"));
    }, []);

    return (

        <section className={classes.root}>
            <h2 className={classes.header}>{app.title}</h2>
            <section className={classes.body}>
                <Switch>

                    <Route exact path="/">
                        {/*<Redirect to="/company_screen"/>*/}
                        <Calculator/>
                    </Route>

                    {/*<Route path="/company">*/}
                    {/*    <CashSettings history={history}/>*/}
                    {/*</Route>*/}

                    <Route path="*">
                        <PageNotFound history={history}/>
                    </Route>


                </Switch>
            </section>

        </section>

    )
}