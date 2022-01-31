import React, { useEffect, useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useChildren from '../../resources/useChildren';
import { useHistory } from 'react-router-dom';
import Eye from '../../assets/icon/View.png';
import TablePagination from '@material-ui/core/TablePagination';
import { Checkbox, Grid, TableFooter, TextField } from '@material-ui/core';
import { useTranslation, Trans } from "react-i18next";
import Search from '../../assets/icon/Search.png';
import { TablePaginationActions } from '../../components/Pagination'
interface Data {
    Id: string,
    FullName: string;
    UserName: string;
    Role: string;
    Action: string;
}

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;

}



type Order = 'asc' | 'desc';




interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'FullName', numeric: false, disablePadding: true, label: 'Full Name' },
    { id: 'Id', numeric: false, disablePadding: true, label: 'Full Name' },
    { id: 'UserName', numeric: true, disablePadding: false, label: 'Username' },
    { id: 'Role', numeric: true, disablePadding: false, label: 'Role' },
    { id: 'Action', numeric: true, disablePadding: false, label: 'Action' },
];






const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            padding: '9px',
            margin: '3px'
        },
        table: {
            maxWidth: 600,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        tabelHeadTitle: {
            fontWeight: 700
        }
    }),
);

export default function ChildrenListing(props: any) {
    const { t } = useTranslation();
    const [order, setOrder] = React.useState<Order>('asc');
    const [total, setTotal] = useState(0)
    const [orderBy, setOrderBy] = React.useState<keyof Data>('FullName');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState('');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    let history = useHistory();

    const { data, status, error, refetch } = useChildren({
        search: search
    });
    const getUserData = () => {
        refetch()
        if (status === "success") {

            setUsersList(data?.children)
            setTotal(data?.count)
        }
    }
    const [usersList, setUsersList] = useState<Data[]>([]);

    useEffect(() => {
        getUserData()

    }, [data])
    const classes = useStyles();

    const [dense, setDense] = React.useState(false);




    const { onSelectAllClick, numSelected, rowCount } =
        props;

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = usersList.map((n: any) => n._id);
            console.log('aaaaaaa', newSelecteds);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {

        const selectedIndex = selected.indexOf(_id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        console.log('dddd', newSelected);
        setSelected(newSelected);
    };
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <div className="mrbDate">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={3} sm={3} lg={3}>
                            <TextField size="small" id="outlined-basic"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                label={t("Amount")} variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3} sm={3} lg={3}>
                            <TextField size="small" id="outlined-basic" InputProps={{
                                endAdornment: (
                                    <img src={Search} alt="" />)
                            }}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                label={t("Full Name")} variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </div>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <>
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selected.length > 0 && selected.length < total}
                                            checked={total > 0 && selected.length === total}
                                            onChange={handleSelectAllClick}
                                        />
                                        {t("Select All")}
                                    </>
                                </TableCell>
                                <TableCell
                                    className={classes.tabelHeadTitle}
                                >
                                    {t("Full Name")}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index) => {
                                const isItemSelected = isSelected(row._id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row._id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{row?.fullName}</TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10]}
                                    colSpan={3}
                                    count={total}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

            </Paper>


        </div>
    );
}
