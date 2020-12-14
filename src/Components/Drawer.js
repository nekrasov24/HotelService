import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { mainListItems, secondaryListItems } from './ListItems';

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        //...theme.mixins.toolbar,
    },
}));
function Draw() {
    const classes = useStyles();

    return (
        <Drawer variant="permanent">
            <div className={classes.toolbarIcon}></div>
            <Divider />
            <List>{mainListItems}</List>

            <List>{secondaryListItems}</List>
        </Drawer>
    );
}

export default Draw;
