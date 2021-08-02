import Mock from 'mockjs';

const Devices = [];

for (let i = 0; i < 86; i++) {
	Devices.push(Mock.mock({
	  id: Mock.Random.guid(),
	  vin: /LHG[A-Z]{2}[0-9]{3}[0-9][A-Z]{3}[0-9]{6}/,
	  name: Mock.Random.csentence(2, 4),
	  uploaddate: Mock.Random.date(),
	  uploadtimes: Mock.Random.integer(1, 20),
	  devicecert: Mock.Random.integer(0, 1),
	  deviceauth: Mock.Random.integer(0, 1)
	}))
}

export { Devices };