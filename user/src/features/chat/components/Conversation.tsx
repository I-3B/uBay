import SendIcon from "@mui/icons-material/Send";
import { Box, Divider, IconButton, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { accountQueries } from "features/account";
import { BOTTOM_NAVIGATOR_HEIGHT_IN_SPACINGS } from "features/layout";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Chat from "../Chat";
import Message from "./Message";
import UserInformation from "./UserInformation";
function Conversation() {
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const isMdOrLarger = useMediaQuery(theme.breakpoints.up("md"));
  const pageTitle = useLocation().pathname.split("/")[2];
  const query = accountQueries.useProfile();
  const socket = io("http://localhost:3000");
  // console.log(query.data);
  socket.emit("join chat", pageTitle);

  useEffect(() => {
    if (query.data) {
      socket.emit("setup", query.data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    socket.on("message received", (data) => {
      console.log("data from conversation", data);
    });
  }, [socket]);
  const sendMessage = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (message.trim().length == 0) return;

    // socket.emit("join chat","123amrtesting")
    const chatId = pageTitle;
    const userId = query.data?._id;

    const data = {
      content: message,
      chat: chatId,
      user: userId,
    };

    axios
      .post(`http://localhost:3000/api/v1/chats/${chatId}/messages`, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Message sent successfully:", response.data);
        socket.emit("new message", response.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
    setMessage("");
  };
  return (
    <Stack direction={"row"} flex={1}>
      {isMdOrLarger && <Chat />}
      <Stack
        width={1}
        flex={2.5}
        sx={{
          maxHeight: {
            xs: `calc(100vh - ${theme.spacing(BOTTOM_NAVIGATOR_HEIGHT_IN_SPACINGS)} - 52px)`,
            sm: `calc(100vh  - 52px)`,
          },
        }}
      >
        <Box p={1} bgcolor={"white"}>
          <UserInformation userData={query.data?._id} />
        </Box>
        <Divider />
        <Message userData={query.data?._id} />
        <Box
          component={"form"}
          sx={{
            bgcolor: "white",
            width: 1,
          }}
        >
          <Divider />
          <Stack
            sx={{
              flexDirection: "row",
              p: 1,
              justifyContent: "space-between",
            }}
          >
            <TextField
              name="content"
              sx={{
                ".MuiInputBase-root": { bgcolor: "white", border: "none" },
                fieldset: { border: "none" },
                width: "88%",
              }}
              size="small"
              onKeyDown={(event) => {
                if (event.key == "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submitRef.current?.click();
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              multiline
              maxRows={10}
            />
            <IconButton
              type="submit"
              sx={{ minWidth: 40 }}
              ref={submitRef}
              onClick={(e) => sendMessage(e)}
              // disabled={postComment.isLoading}
            >
              {/* {postComment.isLoading ? (
            <Loading size={15} />
          ) : (
            <SendIcon sx={{ scale: (th) => (th.direction === "rtl" ? "-1" : "1") }} />
          )} */}
              <SendIcon sx={{ scale: (th) => (th.direction === "rtl" ? "-1" : "1") }} />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
export default Conversation;
