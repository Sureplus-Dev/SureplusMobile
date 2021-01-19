import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

import gql from "graphql-tag";
import getServicePlaid from "../graphql/queries";

import ToolBar from "../components/ToolBar";
import Main from "../components/MainReport";
import Main2 from "../components/MainReport2";
import BottomNavigation from "../components/BottomNavigation";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import { Box, Button } from "@material-ui/core";
//import { AuthContext } from "../context/auth";

const drawerWidth = "75vw";

const useStyles = makeStyles((theme) => ({
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},

	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
}));

export function Report(props) {
	var num = 0;

	// if (props.location.param1 != null) {
	//   num = 1;
	// }
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [ind, setIndex] = React.useState(num);
	const [open, setOpen] = React.useState(false);

	//const context = useContext(AuthContext);

	// try {
	//   props.client
	//     .query({
	//       query: gql(getServicePlaid),
	//     })
	//     .then(({ data }) => {
	//       console.log("demoData", data);
	//     });
	// } catch (e) {
	//   console.log("query error", e);
	// }

	//context.login(props.userData);
	console.log("Report", props.userData);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setOpen(open);
	};

	return (
		<div style={{ width: "100%", alignContent: "center", height: "100vh" }}>
			<div>
				<div
					position="absolute"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
					style={{
						width: "100%",
						height: "5.73vh",
					}}
				>
					<div style={{ width: "100%" }}>
						<Box
							display="flex"
							// p={1}
							alignItems="center"
							style={{
								margin: 0,
								padding: "4px 16px 4px 16px",
								height: "5.72vh",
							}}
						>
							<Box p={1} flexGrow={1} style={{ margin: 0, padding: 0 }}>
								<Button
									onClick={handleDrawerOpen}
									style={{
										padding: 0,
										margin: 0,
										minHeight: 0,
										minWidth: 0,
										borderRadius: "100%",
									}}
								>
									<img
										alt="name"
										src="ProfileIcon.png"
										style={{ width: "4.16vh", height: "4.16vh" }}
									></img>
								</Button>
							</Box>

							<Box
								p={1}
								style={{
									margin: 0,
									padding: 0,
								}}
							>
								<Button
									component={Link}
									to="/Notification"
									style={{
										padding: 0,
										margin: 0,
										minHeight: 0,
										minWidth: 0,
										borderRadius: "100%",
									}}
								>
									<img
										src="/Icons[32]/Type=Notifications.svg"
										alt="name"
										style={{ width: "4.16vh", height: "4.16vh" }}
									></img>
								</Button>
							</Box>
						</Box>
					</div>
				</div>
				<div
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
					style={{
						width: "100%",
						height: "5.73vh",
						marginTop: "1.56vh",
					}}
				>
					<ToolBar value={ind} setValue={setIndex} />
				</div>
				<div
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
					style={{
						width: "100%",
						alignContent: "center",
					}}
				>
					{(() => {
						if (ind == 0) {
							return <Main />;
						} else {
							return <Main2 />;
						}
					})()}
				</div>

				<div
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<BottomNavigation value={value} setValue={setValue} />
				</div>
			</div>
			<Drawer
				className={classes.drawer}
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
				onClick={toggleDrawer("left", false)}
			>
				<div
					style={{
						marginTop: 16,
						padding: "12px 20px 12px 20px",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<img
						alt="name"
						src="ProfileIcon.png"
						style={{ width: "4.16vh", height: "4.16vh" }}
					></img>
					<Typography
						style={{
							margin: 0,
							padding: 0,
							marginLeft: 16,
							fontWeight: 500,
							fontSize: 17,
							alignItems: "center",
						}}
					>
						Jinjae Kim
					</Typography>
				</div>
				{/* Notice List */}
				<Button
					component={Link}
					to="/Profile"
					style={{
						margin: 0,
						padding: 0,

						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
						marginTop: 16,
						height: 48,
						paddingLeft: 20,
						paddingRight: 20,
						paddingTop: 12,
						paddingBottom: 12,
						textTransform: "none",
					}}
				>
					<img
						alt="Notice"
						src="/Icons[24]/Type=Notice.svg"
						style={{ width: "3.125vh", height: "3.125vh" }}
					></img>

					<Typography
						style={{
							margin: 0,
							padding: 0,
							marginLeft: 16,
							fontWeight: 500,
							fontSize: 17,
							alignItems: "center",
						}}
					>
						Profile
					</Typography>
				</Button>
				<Button
					component={Link}
					to="/Profile"
					style={{
						margin: 0,
						padding: 0,

						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
						marginTop: 16,
						paddingLeft: 20,
						paddingRight: 20,
						paddingTop: 12,
						paddingBottom: 12,
						height: 48,
						textTransform: "none",
					}}
				>
					<img
						alt="name"
						src="/Icons[24]/Type=Profile.svg"
						style={{ width: "3.125vh", height: "3.125vh" }}
					></img>
					<Typography
						style={{
							margin: 0,
							padding: 0,
							marginLeft: 16,
							fontWeight: 500,
							fontSize: 17,
							alignItems: "center",
						}}
					>
						Saved
					</Typography>
				</Button>

				<div
					style={{ backgroundColor: "grey", height: "0.5px", marginTop: 16 }}
				></div>
				{/* Privacy and Settings */}
				<Box
					Button
					style={{
						marginTop: 16,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						height: 48,
					}}
				>
					<Typography
						style={{
							margin: 0,
							padding: 0,
							paddingTop: 12,
							paddingLeft: 20,
							paddingBottom: 12,
							fontWeight: 500,
							fontSize: 17,
							alignItems: "center",
						}}
					>
						Privacy and Settings
					</Typography>
				</Box>
				{/* Customer Support */}
				<Box
					Button
					style={{
						marginTop: 16,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						height: 48,
					}}
				>
					<Typography
						style={{
							margin: 0,
							padding: 0,
							paddingTop: 12,
							paddingLeft: 20,
							paddingBottom: 12,
							fontWeight: 500,
							fontSize: 17,
							alignItems: "center",
						}}
					>
						Customer Support
					</Typography>
				</Box>
			</Drawer>
		</div>
	);
}

export default Report;
