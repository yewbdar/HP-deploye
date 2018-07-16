import React ,{Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';
import GridAction from './GridAction'
import PropTypes from 'prop-types';

class  Grid extends Component {
    constructor(props){
        super(props);
        this.state = {
            rowsPerPage : 5,
            page:0
        }
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    split=(row,header)=>{
        if(header.indexOf('.') !== -1){
            let nestedChildsCount = header.split('.').length ;
            let nestedChildsLabelStr = header.split('.');
            let i = 0;
            let temp = row;

            while(i < nestedChildsCount) {
                if(temp !== null || temp !== "undefined" ) {
                    console.log("Before",temp,nestedChildsLabelStr[i]);
                    temp = temp[nestedChildsLabelStr[i]];
                    console.log(temp,nestedChildsLabelStr[i]);
                }
                i++;
            }
            return temp;
        } else {
            return row[header];
        }
    }
    render (){
        const {page, rowsPerPage} = this.state;
        return(
            <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            {this.props.header.map(colName =>{
                                return( <TableCell>{colName}</TableCell> )

                            })}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                       {this.props.dataset.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                                <TableRow key={row.id}>
                                     {
                                         this.props.headerMapping.map(header =>{return <TableCell>{this.split(row,header)}</TableCell> })
                                     }
                                    <TableCell>
                                        <GridAction actionNames = {this.props.actionNames}
                                                    handleAction = {this.props.handleAction}
                                                    actionId={row._id}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={this.props.header.length }
                                count={this.props.dataset.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                           />
                        </TableRow>
                    </TableFooter>
                </Table>

            </Paper>
        )
    }
};
Grid.propTypes = {
    dataset: PropTypes.array.isRequired,
    headerMapping: PropTypes.array.isRequired,
    header: PropTypes.array.isRequired,

};
export default Grid
