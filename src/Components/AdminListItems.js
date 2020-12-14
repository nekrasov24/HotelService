import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

export const mainListItems = (
    <>
        <ListItem button>
            <Button href="/addroom">
                <ListItemText primary="Add Room" />
            </Button>
        </ListItem>
        <ListItem button>
            <ListItemText primary="Edit Room" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Delete Room" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="Get Profile" />
        </ListItem>
        <ListItem button>
            <ListItemText primary="" />
        </ListItem>
    </>
);
