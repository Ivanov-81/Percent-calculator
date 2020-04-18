import React, {Fragment, useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import clsx from 'clsx'

import {addTitle} from "../actions/actionCreator"

import {createStyles, makeStyles, createMuiTheme} from "@material-ui/core/styles"
import {ThemeProvider} from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import Button from "@material-ui/core/Button"
import models from "../js/models";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            background: '#FFFFFF'
        },
        calculator: {
            display: "flex",
            width: "100%",
            height: "95%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        block: {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "35px",
            justifyContent: "center",
        },
        percent: {
            display: "flex",
            margin: "0 13px 0 0",
            height: "100%",
            width: "80px",
            "& div": {
                height: "100%"
            },
            "& input": {
                padding: "7px 0 7px 15px"
            },
            "& p.Mui-error": {
                fontSize: "10px",
                margin: "0 0 0 5px",
                position: "absolute",
                top: "35px",
            }
        },
        adornment: {
            marginRight: 0,
        },
        button: {
            width: "120px",
            height: "100%",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "14px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            boxShadow: "0px 0px 1px 3px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            textTransform: "none",
            border: "1px solid #CCC",
            margin: "0",
        },
        amount: {
            display: "flex",
            margin: "0 10px",
            height: "100%",
            width: "205px",
            "& div": {
                height: "100%"
            },
            "& input": {
                fontSize: "15px",
                paddingLeft: "5px"
            }
        },
        price: {
            display: "flex",
            margin: "0 10px 0 0",
            height: "100%",
            width: "175px",
            "& div": {
                height: "100%"
            },
            "& input": {
                fontSize: "15px",
                paddingLeft: "5px"
            }
        },
        body: {
            display: "flex",
            flexDirection: "column",
            width: "550px",
            height: "85vh",
            minHeight: "25px",
            padding: "15px",
            overflowX: "hidden",
            overflowY: "auto",
            margin: "-15px 0 0 0",
            position: "relative",
            zIndex: 1
        },
        bd: {
            margin: "10px 0 0 0",
            height: "31px",
            overflow: "hidden",
            paddingBottom: "5px",
            position: "relative",
            zIndex: 2
        },
        element: {
            width: "100%",
            minHeight: "30px",
            borderBottom: "1px solid #EBEBEB",
            display: "flex",
            position: "relative",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "0 15px",
            fontSize: "13px",
            color: "#777",
            background: "#FFFFFF",
            cursor: "default",
            "&:hover": {
                background: "#EBEBEB"
            },
        },
        error: {
            color: "#FF0000 !important"
        },
        one: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "50px",
        },
        two: {
            color: "#444",
            width: "170px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        footer: {
            display: "flex",
            flexDirection: "column",
            width: "580px",
            height: "15px",
            minHeight: "15px",
            padding: "0",
            overflow: "hidden",
            margin: "-15px 0 0 0",
            position: "relative",
            background: "#FFFFFF",
            zIndex: 2
        }
    })
);

export default function Calculator() {

    const classes = useStyles();
    const theme = createMuiTheme({});
    const dispatch = useDispatch();

    const [percent, setPercent] = useState("");
    const [errorPercent, setErrorPercent] = useState(false);
    const [helperPercent, setHelperPercent] = useState("");

    const [price, setPrice] = useState("");
    const [price_nds, setPriceNDS] = useState("");

    const [amount, setAmount] = useState("");
    const [amount_nds, setAmountNDS] = useState("");

    const [quantity, setQuantity] = useState("");
    const [errorQuantity, setErrorQuantity] = useState(false);
    const [helperQuantity, setHelperQuantity] = useState("");

    const [blocks, setBlocks] = useState(0);
    const [divs, setDivs] = useState([]);

    const onChangePercent = (e) => {
        if (e.target.value !== "") {
            setPercent(Number(e.target.value.replace(/[^\d]/g, '')))
        } else {
            setPercent("")
            setDivs([])
            setBlocks(0)
            setErrorPercent(false)
            setHelperPercent("")
        }

    }
    const handleFocusPercent = (e) => {

    }


    const onChangeQuantity = (e) => {
        setQuantity(Number(e.target.value.replace(/[^\d]/g, '')))
    }
    const handleFocusQuantity = (e) => {

    }


    const onChangePrice = (e) => {
        setPrice(e.target.value.replace(/,/, '.'))
    }
    const handleFocusPrice = () => {

    }


    const onChangePriceNDS = (e) => {
        setPriceNDS(e.target.value)
    }
    const handleFocusPriceNDS = () => {

    }


    const handlerCalculate = () => {

        setPriceNDS(models.mathRound(Number(price) * 1.2, 4))
        setAmount(models.mathRound(Number(price) * Number(quantity), 4))
        setAmountNDS(models.mathRound((Number(price) * 1.2) * Number(quantity), 4))

        if (isNaN(parseInt(percent))) {
            return
        } else {
            if (percent > 30) {
                setErrorPercent(true)
                setHelperPercent("Max 30%")
                setPercent(30)
                setBlocks(30)
            } else {
                setBlocks(percent)
            }
        }

    }

    const handleKeyPress = (e) => {

        if (e.key === 'Enter') {

            handlerCalculate();

        }
    };

    useEffect(() => {
        dispatch(addTitle("Процентный калькулятор"));
    }, []);

    useEffect(() => {

        let arr = [],
            num = blocks;
        for (let i = 0; i < blocks; i++) {
            arr.push(num--)
        }

        setDivs(arr);

    }, [blocks]);

    return (

        <section className={classes.calculator}>

            <div className={classes.block} onKeyPress={e => handleKeyPress(e)}>

                <ThemeProvider theme={theme}>
                    <TextField
                        autoFocus
                        label="Цена без НДС"
                        className={classes.price}
                        value={price}
                        name="price"
                        id="price"
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                        onChange={onChangePrice}
                        onFocus={handleFocusPrice}
                        InputProps={{
                            inputProps: {maxLength: 20},
                            startAdornment: <InputAdornment position="start" style={{marginLeft: "-15px"}}/>,
                            endAdornment: <InputAdornment position="start">руб.</InputAdornment>
                        }}
                    />
                </ThemeProvider>

                <ThemeProvider theme={theme}>
                    <TextField
                        label="Цена с НДС"
                        className={classes.price}
                        value={price_nds}
                        name="price_nds"
                        id="price_nds"
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                        onChange={onChangePriceNDS}
                        onFocus={handleFocusPriceNDS}
                        InputProps={{
                            inputProps: {
                                maxLength: 20,
                                readOnly: true,
                            },
                            startAdornment: <InputAdornment position="start" style={{marginLeft: "-15px"}}/>,
                            endAdornment: <InputAdornment position="start">руб.</InputAdornment>
                        }}
                    />
                </ThemeProvider>


                <ThemeProvider theme={theme}>
                    <TextField
                        label="Кол-во"
                        className={classes.percent}
                        error={errorQuantity}
                        value={quantity}
                        helperText={helperQuantity}
                        name="quantity"
                        id="quantity"
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                        onChange={onChangeQuantity}
                        onFocus={handleFocusQuantity}
                        InputProps={{
                            inputProps: {maxLength: 6},
                            startAdornment: <InputAdornment position="start" style={{marginLeft: "-15px"}}/>,
                        }}
                        type="percent"
                    />
                </ThemeProvider>

                <ThemeProvider theme={theme}>
                    <TextField
                        label="Сумма без НДС"
                        className={classes.amount}
                        value={amount}
                        name="amount"
                        id="amount"
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                        onChange={onChangePrice}
                        onFocus={handleFocusPrice}
                        InputProps={{
                            inputProps: {
                                maxLength: 11,
                                readOnly: true,
                            },
                            startAdornment: <InputAdornment position="start" style={{marginLeft: "-15px"}}/>,
                            endAdornment: <InputAdornment position="start">руб.</InputAdornment>
                        }}
                    />
                </ThemeProvider>

                <ThemeProvider theme={theme}>
                    <TextField
                        label="Сумма с НДС"
                        className={classes.amount}
                        value={amount_nds}
                        name="amount_nds"
                        id="amount_nds"
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                        InputProps={{
                            inputProps: {
                                maxLength: 30,
                                readOnly: true,
                            },
                            startAdornment: <InputAdornment position="start" style={{marginLeft: "-15px"}}/>,
                            endAdornment: <InputAdornment position="start">руб.</InputAdornment>
                        }}
                    />
                </ThemeProvider>

                <ThemeProvider theme={theme}>
                    <TextField
                        label="Процент"
                        className={classes.percent}
                        error={errorPercent}
                        value={percent}
                        helperText={helperPercent}
                        name="percent"
                        id="percent"
                        margin="normal"
                        variant="outlined"
                        autoComplete="off"
                        onChange={onChangePercent}
                        onFocus={handleFocusPercent}
                        InputProps={{
                            inputProps: {maxLength: 2},
                            startAdornment: <InputAdornment position="start" style={{marginLeft: "-15px"}}/>,
                            endAdornment: <InputAdornment className={classes.adornment}
                                                          position="start">%</InputAdornment>
                        }}
                        type="percent"
                    />
                </ThemeProvider>

                <Button
                    name="button"
                    id="button"
                    className={clsx(classes.button)}
                    onClick={handlerCalculate}
                >
                    Рассчитать
                </Button>
            </div>
            <div className={clsx(classes.body, classes.bd)}>
                <div className={clsx(classes.element)}>
                    <div className={classes.one}>%</div>
                    <div className={classes.two}>без НДС руб</div>
                    <div className={classes.two}>с НДС руб</div>
                </div>
            </div>
            <div className={classes.body}>

                {
                    divs.map((item) => {
                        return <div key={item} className={clsx(classes.element, item < 6 && classes.error)}>
                            <div className={clsx(classes.one, item < 6 && classes.error)}>{item} %</div>
                            <div
                                className={clsx(classes.two, item < 6 && classes.error)}>{models.mathRound(amount * ((item / 100) + 1), 4)}
                            </div>
                            <div
                                className={clsx(classes.two, item < 6 && classes.error)}>{models.mathRound(amount_nds * ((item / 100) + 1), 4)}
                            </div>
                        </div>
                    })
                }

            </div>

            <div className={classes.footer} />

        </section>

    )
}