import { DataGrid } from "@material-ui/data-grid";
import * as React from "react";
import GetLabel from "./GetLabel";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import AdvancedModal from "./AdvancedModal";
import RefreshIcon from "@mui/icons-material/Refresh";



//styling header and adding check boxes in it

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCheckbox-root": {
      color: "#fff",
    },
    "& .MuiToolbar-root": {
      color: "#fff",
    },

//
"& .MuiDataGrid-columnHeaderTitle": {
  textOverflow: "clip",
  whiteSpace: "break-spaces",
  lineHeight: 1,
},

//icon seperator with transparent colour
"& .MuiDataGrid-iconSeparator": {
  color: "transparent",
},

//bg colour of header    
    backgroundColor: "#283D4A",
    marginTop: "10px",
  },
  grid: {
    color: "white",

    //
    marginTop: "10px",
    border: "none",
    //adding buttons and styling it.
  },
  grid1: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    marginRight: "50px",
  },
  button1: {
    color: "white",
    border: "1px solid",
    borderColor: "#303F9F",
  },
  button2: {
    borderColor: "#39495 ",
    color: "white",
    border: "1px solid",
  },
  buttond: {
    marginTop: "10px",
  },
  buttond2: {
    marginTop: "10px",
    marginLeft: "10px",
    width: "100%",
    marginRight: "0px",
  },
  textField: {
    marginTop: "10px",
  },
  button_1: {   //add button
    color: "white",
    border: "1px solid",
    borderColor: "#303F9F",
    width: "400px",
  },
  button1_pr: {
    backgroundColor: "#1294c9",  //predict button colour
    color: "white",
  },
}));

const columns = GetLabel;

export default function Table() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [addOpen, setaddOpen] = React.useState(false);
  const [advanced, setAdvanced] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [edit, setEdit] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleClickEdit = () => {
    setEdit(true);
  };

  const handleClickAdd = () => {
    setaddOpen(true);
  };

  const handleClickAdvanced = () => {
    setAdvanced(true);
  };

  //fetching data from backend(eclipse) using this link.
  const fetchdata = () => {
    fetch("http://localhost:8082/HRC/fetch")
      .then((res) => res.json())
      .then((data) => setData(data));
      
  };

  //searching data
  React.useEffect(() => {
    fetchdata();
  }, []);

  function search(infodata) {
    const newdata = infodata.filter((info) =>
      info.cust_number.toString().startsWith(q)
    );

    return newdata;
  }

  return (
    <div className={classes.root} >
      <div >
        <Grid className={classes.grid1}>
          <Grid item xs={5} >
            <ButtonGroup
              variant="outlined"
              color="primary"
              aria-label="contained primary button group"
              fullWidth={true}
              
              className={classes.buttond}
              
            > 
            {/* predict, av, adv search */}
              <Button className={classes.button1_pr}>PREDICT</Button>
              <Button className={classes.button1}>ANALYTICS VIEW</Button>
              <Button className={classes.button1} onClick={handleClickAdvanced}>
                ADVANCED SEARCH
                
              </Button>
            </ButtonGroup>
          </Grid>
          

            {/* refresh button */}
          <Grid item style={{ marginRight: "20px" }}>
            <Button
              style={{ marginTop: "20px",color: "#1B83BA",borderColor: "#1B83BA", }}	
              
              onClick={() => {
                fetchdata();
              }}
              variant="outlined"
            >
              <RefreshIcon style={{color: "#1B83BA"}}/>
            </Button>
          </Grid>


              {/* search button */}
          <Grid item xs={3}>
            <form noValidate autoComplete="off">
              <TextField
                id="filled-secondary"
                label="Search Customer Id"
                variant="filled"
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  marginLeft: "30px",
                }}
                className={classes.textField}
                value={q}
                onChange={(e) => {
                
                  setQ(e.target.value)
                
                }}
              />
            </form>
          </Grid>
          <Grid item xs={4}>
            <ButtonGroup
              variant="outlined"
              color="primary"
              aria-label="contained primary button group"
              fullWidth={true}
              className={classes.buttond2}
            >
              <Button className={classes.button_1} onClick={handleClickAdd}>
                ADD
              </Button>
              {/* add, edit delete button */}
              <Button
                className={classes.button_2}
                onClick={handleClickEdit}
                style={
                  selectedRows.length === 1
                    ? {}
                    : { pointerEvents: "none", opacity: "0.5" }
                }
              >
                EDIT
              </Button>
              <Button
                className={classes.button_1}
                onClick={handleClickOpen}
                style={
                  selectedRows.length >= 1
                    ? {}
                    : { pointerEvents: "none", opacity: "0.5" }
                }
              >
                DELETE
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
      <div style={{ height: 360, width: "100%", backgroundColor: "#283D4A" }}>
        <DataGrid
          rows={search(data)}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          disableColumnMenu={true}
          sortable={true}
          className={classes.grid}
          getRowId={(row) => row.sl_no}
          rowHeight={28}
          onSelectionModelChange={(One) => {
            const eachOne = new Set(One);
            const hereSelectedRows = data.filter((row) =>
              eachOne.has(row.sl_no)
            );
            console.log(hereSelectedRows);
            setSelectedRows(hereSelectedRows);
          }}
        />
      </div>
      <DeleteModal open={open} setOpen={setOpen} />
      <EditModal edit={edit} setEdit={setEdit} />
      <AddModal addOpen={addOpen} setaddOpen={setaddOpen} />
      <AdvancedModal advanced={advanced} setAdvanced={setAdvanced} />
    </div>
  );
}
