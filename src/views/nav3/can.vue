<template>
	<section>
		<!--列表-->
		<el-table :stripe="false" :data="logs" highlight-current-row v-loading="listLoading" style="width: 100%;">
		<!-- <el-table :stripe="false" :row-class-name="tableRowClassName" :data="logs" highlight-current-row v-loading="listLoading" style="width: 100%;"> -->
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="BCS_8_A_Checksum" label="BCS_8_A_Checksum" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_8_A_MsgCounter" label="BCS_8_A_MsgCounter" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_ABAactive" label="BCS_ABAactive" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_ABAavailable" label="BCS_ABAavailable" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_ABPActive" label="BCS_ABPActive" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_ABPAvailable" label="BCS_ABPAvailable" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_AEBActive" label="BCS_AEBActive" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_AEBAvailable" label="BCS_AEBAvailable" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_AWBActive" label="BCS_AWBActive" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_AWBAvailable" label="BCS_AWBAvailable" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_BrakeOverHeat" label="BCS_BrakeOverHeat" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_CDDActive" label="BCS_CDDActive" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_CDDAvailable" label="BCS_CDDAvailable" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_CDDFail" label="BCS_CDDFail" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_BrakeOverHeat" label="BCS_BrakeOverHeat" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_MasterCylinderPr" label="BCS_MasterCylinderPr" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_MasterCylinderPrOffset" label="BCS_MasterCylinderPrOffset" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_MasterCylinderPrVD" label="BCS_MasterCylinderPrVD" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_NoBrakeForce" label="BCS_NoBrakeForce" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_QDCACC" label="BCS_QDCACC" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCS_VehicleStandStillSt" label="BCS_VehicleStandStillSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_AutoLightCtrlSt" label="BCM_AutoLightCtrlSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_BCAN_2_Checksum" label="BCM_BCAN_2_Checksum" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_BCAN_2_MsgCounter" label="BCM_BCAN_2_MsgCounter" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_BeamSwitchSt" label="BCM_BeamSwitchSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_DriverDoorAjarSt" label="BCM_DriverDoorAjarSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_FrontFogLampSt" label="BCM_FrontFogLampSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_FrontWasherSt" label="BCM_FrontWasherSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_FrontWiperSt" label="BCM_FrontWiperSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_HighBeamSt" label="BCM_HighBeamSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_KeySt" label="BCM_KeySt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_LeftTurnLampFaultSt" label="BCM_LeftTurnLampFaultSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_LeftTurnLampSt" label="BCM_LeftTurnLampSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_LowBeamSt" label="BCM_LowBeamSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_PsngrDoorAjarSt" label="BCM_PsngrDoorAjarSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_RLDoorAjarSt" label="BCM_RLDoorAjarSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_RRDoorAjarSt" label="BCM_RRDoorAjarSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_RearFogLampSt" label="BCM_RearFogLampSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_RightTurnLampFaultSt" label="BCM_RightTurnLampFaultSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_RightTurnLampSt" label="BCM_RightTurnLampSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="BCM_TurnLightSwitchSt" label="BCM_TurnLightSwitchSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_13_A_Checksum" label="VCU_13_A_Checksum" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_13_A_MsgCounter" label="VCU_13_A_MsgCounter" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_ACCLimitOperatingSt" label="VCU_ACCLimitOperatingSt" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_ACCMaxRecpDecel" label="VCU_ACCMaxRecpDecel" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_ACCMaxRecpDecelVD" label="VCU_ACCMaxRecpDecelVD" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_ACCmaxSpdLimit" label="VCU_ACCmaxSpdLimit" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_ActVehWheelTorq" label="VCU_ActVehWheelTorq" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_LateralAssistBtnInfo" label="VCU_LateralAssistBtnInfo" width="260" sortable>
			</el-table-column>
			<el-table-column prop="VCU_LateralAssistBtnInfoVD" label="VCU_LateralAssistBtnInfoVD" width="260" sortable>
			</el-table-column>
			<el-table-column prop="PAS_APASt" label="PAS_APASt" width="260" sortable>
			</el-table-column>
		</el-table>
		
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getLogListPage } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					vin: '',
					head_ver: '',
					event_id: '',
					event_time: '',
					latitude: '',
					hard_ver: '',
					soft_ver: '',
					et: ''
				},
				logs: [
					{
						"BCS_8_A_Checksum": 103,
						"BCS_8_A_MsgCounter": 8,
						"BCS_ABAactive": "Not Active",
						"BCS_ABAavailable": "Available",
						"BCS_ABPActive": "Not Active",
						"BCS_ABPAvailable": "Available",
						"BCS_AEBActive": "Not Active",
						"BCS_AEBAvailable": "Available",
						"BCS_AWBActive": "Not Active",
						"BCS_AWBAvailable": "Available",
						"BCS_BrakeOverHeat": "Not high",
						"BCS_CDDActive": "Not active",
						"BCS_CDDAvailable": "Available",
						"BCS_CDDFail": "Not failure",
						"BCS_MasterCylinderPr": 0,
						"BCS_MasterCylinderPrOffset": -0.199999999999999,
						"BCS_MasterCylinderPrOffsetVD": "Valid",
						"BCS_MasterCylinderPrVD": "Valid",
						"BCS_NoBrakeForce": "No brake force",
						"BCS_QDCACC": "No error",
						"BCS_VehicleStandStillSt": "standstill",
						"BCM_AutoLightCtrlSt": "Not active",
						"BCM_BCAN_2_Checksum": 217,
						"BCM_BCAN_2_MsgCounter": 13,
						"BCM_BeamSwitchSt": "high beam",
						"BCM_DriverDoorAjarSt": "Closed",
						"BCM_FrontFogLampSt": "Not active",
						"BCM_FrontWasherSt": "Off",
						"BCM_FrontWiperSt": "OFF",
						"BCM_HighBeamSt": "Not active",
						"BCM_KeySt": "On",
						"BCM_LeftTurnLampFaultSt": "Fault",
						"BCM_LeftTurnLampSt": "Not active",
						"BCM_LowBeamSt": "Not active",
						"BCM_PsngrDoorAjarSt": "Closed",
						"BCM_RLDoorAjarSt": "Closed",
						"BCM_RRDoorAjarSt": "Closed",
						"BCM_RearFogLampSt": "Not active",
						"BCM_RightTurnLampFaultSt": "Fault",
						"BCM_RightTurnLampSt": "Not active",
						"BCM_TurnLightSwitchSt": "Not active",
						"VCU_13_A_Checksum": 52,
						"VCU_13_A_MsgCounter": 3,
						"VCU_ACCLimitOperatingSt": "Not active",
						"VCU_ACCMaxRecpDecel": 0,
						"VCU_ACCMaxRecpDecelVD": "Valid",
						"VCU_ACCmaxSpdLimit": "140 Km/h",
						"VCU_ActVehWheelTorq": 0,
						"VCU_LateralAssistBtnInfo": "Not pressed",
						"VCU_LateralAssistBtnInfoVD": "Valid",
						"PAS_APASt": "Standby"
					},
					{
						"BCS_8_A_Checksum": 103,
						"BCS_8_A_MsgCounter": 8,
						"BCS_ABAactive": "Not Active",
						"BCS_ABAavailable": "Available",
						"BCS_ABPActive": "Not Active",
						"BCS_ABPAvailable": "Available",
						"BCS_AEBActive": "Not Active",
						"BCS_AEBAvailable": "Available",
						"BCS_AWBActive": "Not Active",
						"BCS_AWBAvailable": "Available",
						"BCS_BrakeOverHeat": "Not high",
						"BCS_CDDActive": "Not active",
						"BCS_CDDAvailable": "Available",
						"BCS_CDDFail": "Not failure",
						"BCS_MasterCylinderPr": 0,
						"BCS_MasterCylinderPrOffset": -0.19,
						"BCS_MasterCylinderPrOffsetVD": "Valid",
						"BCS_MasterCylinderPrVD": "Valid",
						"BCS_NoBrakeForce": "No brake force",
						"BCS_QDCACC": "No error",
						"BCS_VehicleStandStillSt": "standstill",
						"BCM_AutoLightCtrlSt": "Not active",
						"BCM_BCAN_2_Checksum": 217,
						"BCM_BCAN_2_MsgCounter": 13,
						"BCM_BeamSwitchSt": "high beam",
						"BCM_DriverDoorAjarSt": "Closed",
						"BCM_FrontFogLampSt": "Not active",
						"BCM_FrontWasherSt": "Off",
						"BCM_FrontWiperSt": "OFF",
						"BCM_HighBeamSt": "Not active",
						"BCM_KeySt": "On",
						"BCM_LeftTurnLampFaultSt": "Fault",
						"BCM_LeftTurnLampSt": "Not active",
						"BCM_LowBeamSt": "Not active",
						"BCM_PsngrDoorAjarSt": "Closed",
						"BCM_RLDoorAjarSt": "Closed",
						"BCM_RRDoorAjarSt": "Closed",
						"BCM_RearFogLampSt": "Not active",
						"BCM_RightTurnLampFaultSt": "Fault",
						"BCM_RightTurnLampSt": "Not active",
						"BCM_TurnLightSwitchSt": "Not active",
						"VCU_13_A_Checksum": 52,
						"VCU_13_A_MsgCounter": 3,
						"VCU_ACCLimitOperatingSt": "Not active",
						"VCU_ACCMaxRecpDecel": 0,
						"VCU_ACCMaxRecpDecelVD": "Valid",
						"VCU_ACCmaxSpdLimit": "140 Km/h",
						"VCU_ActVehWheelTorq": 0,
						"VCU_LateralAssistBtnInfo": "Not pressed",
						"VCU_LateralAssistBtnInfoVD": "Valid",
						"PAS_APASt": "Standby"
					},
					{
						"BCS_8_A_Checksum": 103,
						"BCS_8_A_MsgCounter": 8,
						"BCS_ABAactive": "Not Active",
						"BCS_ABAavailable": "Available",
						"BCS_ABPActive": "Not Active",
						"BCS_ABPAvailable": "Available",
						"BCS_AEBActive": "Not Active",
						"BCS_AEBAvailable": "Available",
						"BCS_AWBActive": "Not Active",
						"BCS_AWBAvailable": "Available",
						"BCS_BrakeOverHeat": "Not high",
						"BCS_CDDActive": "Not active",
						"BCS_CDDAvailable": "Available",
						"BCS_CDDFail": "Not failure",
						"BCS_MasterCylinderPr": 0,
						"BCS_MasterCylinderPrOffset": -0.19,
						"BCS_MasterCylinderPrOffsetVD": "Valid",
						"BCS_MasterCylinderPrVD": "Valid",
						"BCS_NoBrakeForce": "No brake force",
						"BCS_QDCACC": "No error",
						"BCS_VehicleStandStillSt": "standstill",
						"BCM_AutoLightCtrlSt": "Not active",
						"BCM_BCAN_2_Checksum": 217,
						"BCM_BCAN_2_MsgCounter": 13,
						"BCM_BeamSwitchSt": "high beam",
						"BCM_DriverDoorAjarSt": "Closed",
						"BCM_FrontFogLampSt": "Not active",
						"BCM_FrontWasherSt": "Off",
						"BCM_FrontWiperSt": "OFF",
						"BCM_HighBeamSt": "Not active",
						"BCM_KeySt": "On",
						"BCM_LeftTurnLampFaultSt": "Fault",
						"BCM_LeftTurnLampSt": "Not active",
						"BCM_LowBeamSt": "Not active",
						"BCM_PsngrDoorAjarSt": "Closed",
						"BCM_RLDoorAjarSt": "Closed",
						"BCM_RRDoorAjarSt": "Closed",
						"BCM_RearFogLampSt": "Not active",
						"BCM_RightTurnLampFaultSt": "Fault",
						"BCM_RightTurnLampSt": "Not active",
						"BCM_TurnLightSwitchSt": "Not active",
						"VCU_13_A_Checksum": 52,
						"VCU_13_A_MsgCounter": 3,
						"VCU_ACCLimitOperatingSt": "Not active",
						"VCU_ACCMaxRecpDecel": 0,
						"VCU_ACCMaxRecpDecelVD": "Valid",
						"VCU_ACCmaxSpdLimit": "140 Km/h",
						"VCU_ActVehWheelTorq": 0,
						"VCU_LateralAssistBtnInfo": "Not pressed",
						"VCU_LateralAssistBtnInfoVD": "Valid",
						"PAS_APASt": "Standby"
					},
					{
						"BCS_8_A_Checksum": 103,
						"BCS_8_A_MsgCounter": 8,
						"BCS_ABAactive": "Not Active",
						"BCS_ABAavailable": "Available",
						"BCS_ABPActive": "Not Active",
						"BCS_ABPAvailable": "Available",
						"BCS_AEBActive": "Not Active",
						"BCS_AEBAvailable": "Available",
						"BCS_AWBActive": "Not Active",
						"BCS_AWBAvailable": "Available",
						"BCS_BrakeOverHeat": "Not high",
						"BCS_CDDActive": "Not active",
						"BCS_CDDAvailable": "Available",
						"BCS_CDDFail": "Not failure",
						"BCS_MasterCylinderPr": 0,
						"BCS_MasterCylinderPrOffset": -0.19,
						"BCS_MasterCylinderPrOffsetVD": "Valid",
						"BCS_MasterCylinderPrVD": "Valid",
						"BCS_NoBrakeForce": "No brake force",
						"BCS_QDCACC": "No error",
						"BCS_VehicleStandStillSt": "standstill",
						"BCM_AutoLightCtrlSt": "Not active",
						"BCM_BCAN_2_Checksum": 217,
						"BCM_BCAN_2_MsgCounter": 13,
						"BCM_BeamSwitchSt": "high beam",
						"BCM_DriverDoorAjarSt": "Closed",
						"BCM_FrontFogLampSt": "Not active",
						"BCM_FrontWasherSt": "Off",
						"BCM_FrontWiperSt": "OFF",
						"BCM_HighBeamSt": "Not active",
						"BCM_KeySt": "On",
						"BCM_LeftTurnLampFaultSt": "Fault",
						"BCM_LeftTurnLampSt": "Not active",
						"BCM_LowBeamSt": "Not active",
						"BCM_PsngrDoorAjarSt": "Closed",
						"BCM_RLDoorAjarSt": "Closed",
						"BCM_RRDoorAjarSt": "Closed",
						"BCM_RearFogLampSt": "Not active",
						"BCM_RightTurnLampFaultSt": "Fault",
						"BCM_RightTurnLampSt": "Not active",
						"BCM_TurnLightSwitchSt": "Not active",
						"VCU_13_A_Checksum": 52,
						"VCU_13_A_MsgCounter": 3,
						"VCU_ACCLimitOperatingSt": "Not active",
						"VCU_ACCMaxRecpDecel": 0,
						"VCU_ACCMaxRecpDecelVD": "Valid",
						"VCU_ACCmaxSpdLimit": "140 Km/h",
						"VCU_ActVehWheelTorq": 0,
						"VCU_LateralAssistBtnInfo": "Not pressed",
						"VCU_LateralAssistBtnInfoVD": "Valid",
						"PAS_APASt": "Standby"
					}
				],
				total: 0,
				page: 1,
				listLoading: false,
			}
		},
		
		methods: {
			handleCurrentChange(val) {
				this.page = val;
			},
		
		mounted() {
			
		}
	}
}
</script>

<style scoped>
<style>