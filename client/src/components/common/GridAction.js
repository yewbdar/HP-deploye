import React ,{Component } from 'react';
import Button from '@material-ui/core/Button';


class  GridAction extends Component {
    constructor(props)
    {
        super(props);
     }

    // this.props.handleAction

    render(){
         return(
             <div>
                 {this.props.actionNames.map((actionName,i) => {{
                     return(
                            <a href="#" color="primary" data-article-id={this.props.actionId} onClick={this.props.handleAction} name={actionName}>
                                    {actionName}
                                    {this.props.actionNames.length - 1 !== i && "  |  " }
                            </a>
                            )
                    }
                 }
                 )}
             </div>
         )
    }
}
export default GridAction;