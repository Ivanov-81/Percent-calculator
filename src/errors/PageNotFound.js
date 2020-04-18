import React, {useEffect} from "react"
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"

import {addTitle} from "../actions/actionCreator"

import {createStyles, makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            textAlign: "center",
            color: "#ff0000",
            fontSize: "40px",
            marginTop: "150px"
        }
    })
);

export default function PageNotFound() {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addTitle("Страница не найдена!"));
    }, []);

    setTimeout(() => {
        let elem = document.getElementById("page_not_found");
        if (elem != null) {
            history.push("/");
            dispatch(addTitle(""));
        }
    }, 5000);

    return (
        <section id="page_not_found" className={classes.root}>
            Страница не найдена (404)!
        </section>
    )

}