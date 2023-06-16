import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCreation, useLatest, useRequest, useSetState } from "ahooks";
import { StyledTab, StyledTabs } from "../components/common/CommonTabs";
import { useUserModel } from "../models/useUserModel";
import { getUserDetail, getUserVipInfo } from "../services/user.service";
import { formatImageSize } from "../utils";
import SingleCard from "../components/common/SingleCard";
import { Radio } from "@mui/icons-material";
import { getUserPlaylist } from "../services/playlist.service";
import SwipeableViews from "react-swipeable-views";
import PlaylistItem from "../components/ListItem/PlaylistItem";

const ProfilePage = () => {
  const { user } = useUserModel((store) => [store.user]);
  const uidRef = useLatest(user.userInfo?.id);

  const {
    data: userDetail,
    run: requestUserDetail,
    loading: userDetailLoading,
  } = useRequest(getUserDetail, {
    manual: true,
  });
  const {
    data: userVip,
    run: requestUserVip,
    loading: userVipLoading,
  } = useRequest(getUserVipInfo, { manual: true });

  const {
    data: playlistData,
    run: requestPlaylist,
    loading: playlistLoading,
  } = useRequest(getUserPlaylist, { manual: true });

  const [state, setState] = useSetState({
    vipIcon: "",
    level: 0,
    followers: 0,
    followeds: 0,
    tabSelect: 0,
    myFondPlaylist: null as any | null,
    collectedPlaylist: [],
    createdPlaylist: [],
  });

  useCreation(() => {
    // const level = userDetail.level;
    console.log({ userDetail });
    if (userDetail) {
      setState({
        level: userDetail.level,
        followers: userDetail.profile.follows,
        followeds: userDetail.profile.followeds,
      });
    }
  }, [userDetail]);

  useCreation(() => {
    if (userVip) {
      setState({
        vipIcon: userVip.data?.redVipDynamicIconUrl,
      });
    }
  }, [userVip]);

  useCreation(() => {
    console.log({ playlistData });
    if (playlistData) {
      const { playlist } = playlistData;
      const myFondPlaylist = playlist[0];
      const otherPlaylist = playlist.splice(1);
      const collectedPlaylist = otherPlaylist.filter(
        (item: { userId: string | undefined }) => item.userId !== uidRef.current
      );
      const createdPlaylist = otherPlaylist.filter(
        (item: { userId: string | undefined }) => item.userId === uidRef.current
      );
      console.log({
        myFondPlaylist,
        collectedPlaylist,
        createdPlaylist,
      });
      setState({
        myFondPlaylist,
        collectedPlaylist,
        createdPlaylist,
      });
    }
  }, [playlistData]);

  useCreation(() => {
    if (uidRef.current) {
      requestUserDetail(uidRef.current);
      requestUserVip();
      requestPlaylist({ uid: uidRef.current });
    }
  }, [uidRef.current]);

  const loading = userDetailLoading && userVipLoading;

  return (
    <Stack spacing={1.5}>
      <Paper sx={{ p: 2, pt: 5, mt: 5, position: "relative" }}>
        <Avatar
          src={formatImageSize(user.userInfo?.avatar ?? "", 128)}
          sx={{
            width: 64,
            height: 64,
            position: "absolute",
            top: -32,
            left: "50%",
            ml: -4,
          }}
        />
        <Stack sx={{ alignItems: "center", gap: 0.75 }}>
          <Typography fontWeight={600}>{user.userInfo?.nickname}</Typography>
          <img src={state.vipIcon} alt="" style={{ height: 16 }} />
          <Stack
            sx={{ gap: 16, flexDirection: "row", mt: 2, alignItems: "center" }}
            divider={<Divider orientation="vertical" sx={{ height: 24 }} />}
          >
            <Stack sx={{ alignItems: "center" }}>
              <Typography>{state.followers}</Typography>
              <Typography fontWeight={600} variant="body2">
                关注
              </Typography>
            </Stack>
            <Stack sx={{ alignItems: "center" }}>
              <Typography>{state.followeds}</Typography>
              <Typography fontWeight={600} variant="body2">
                粉丝
              </Typography>
            </Stack>
            <Stack sx={{ alignItems: "center" }}>
              <Typography>{state.level}</Typography>
              <Typography fontWeight={600} variant="body2">
                等级
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      <Button>
        <SingleCard
          label={state.myFondPlaylist?.name ?? "我喜欢的音乐"}
          icon={<Radio color="primary" />}
        />
      </Button>
      <Paper sx={{ p: 2, pt: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            value={state.tabSelect}
            centered
            onChange={(_, newValue) => setState({ tabSelect: newValue })}
          >
            <StyledTab label="创建的歌单" />
            <StyledTab label="收藏的歌单" />
          </StyledTabs>
        </Box>
        <SwipeableViews
          disableLazyLoading
          index={state.tabSelect}
          onChangeIndex={(index) => {
            setState({ tabSelect: index });
          }}
          containerStyle={{ height: 500 }}
          style={{ height: "100%", marginTop: 8 }}
          slideStyle={{
            height: "100%",
          }}
        >
          <Stack sx={{ width: "100%" }}>
            {state.createdPlaylist.map((item: any, index: number) => (
              <PlaylistItem key={item.id} playlist={item} />
            ))}
          </Stack>
          <Stack sx={{ width: "100%" }}>
            {state.collectedPlaylist.map((item: any, index: number) => (
              <PlaylistItem key={item.id} playlist={item} />
            ))}
          </Stack>
        </SwipeableViews>
      </Paper>
    </Stack>
  );
};

export default ProfilePage;
