import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHistory,
  getSingleHistory,
} from "../../store/actions/historyAction";
import { Box, Typography } from "@mui/material";
import { formatDateToWords, getCurrency } from "../../hooks/helpers";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import HistoryModal from "./HistoryModal";

const History = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useSelector((state) => state.history.history);
  const user = useSelector((state) => state.auth.admin);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getHistory());
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" color="primary.main">
          My order history
        </Typography>
      </Box>
      <hr />
      <div>
        {history?.map((i) => {
          return (
            <>
              <Box
                mt={1}
                onClick={() => {
                  setCurrent(i.id);
                  dispatch(getSingleHistory({ id: i.id }));
                  handleOpen();
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography>
                    {formatDateToWords(i.createdAt.slice(0, 10))}
                  </Typography>
                </Box>
                <Box
                  mt={1}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 10px",
                    background: "white",
                    borderRadius: "5px",
                    alignItems: "center",
                  }}
                >
                  <div
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <LocalCarWashIcon sx={{ color: "primary.main" }} />
                    {i.box.name.slice(0, 10)}...
                  </div>
                  <div
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {i.price} {getCurrency(user?.countryId)} at {i.time}
                  </div>
                </Box>
              </Box>
            </>
          );
        })}
      </div>
      <HistoryModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default History;
