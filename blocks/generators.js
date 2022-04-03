const KIDMOTOR_BEGIN = `KidMotorV4`;
const KIDMOTOR_GEN_SET_MOTOR = (ch, dir, speed) => `${KIDMOTOR_BEGIN}.setMotor(${ch}, ${dir}, ${speed});`;
const KIDMOTOR_GEN_DELAY = (t) => `sleep(${t});`;
const KIDMOTOR_GEN_SET_MOTOR_STOP = () => `${KIDMOTOR_GEN_SET_MOTOR(1, 0, 0)} ${KIDMOTOR_GEN_SET_MOTOR(2, 0, 0)}`;

Blockly.Python['kidmotor_motor'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

  var dropdown_n = block.getFieldValue('n');
  var dropdown_dir = block.getFieldValue('dir');
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);

  var code = `${KIDMOTOR_BEGIN}.setMotor(${dropdown_n}, ${dropdown_dir}, ${value_value})\n`;
  return code;
};

Blockly.Python['kidmotor_digital_read'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

  var dropdown_pin = block.getFieldValue('pin');
  
	var code = `${KIDMOTOR_BEGIN}.getInput(${dropdown_pin})`;
	return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['kidmotor_digital_write'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

	var dropdown_pin = block.getFieldValue('pin');
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC) || "0";
  
	var code = `${KIDMOTOR_BEGIN}.setOutput(${dropdown_pin}, ${value_value})\n`;
	return code;
};

Blockly.Python['kidmotor_analog_read'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

  var dropdown_pin = block.getFieldValue('pin');
  
	var code = `${KIDMOTOR_BEGIN}.getADC(${dropdown_pin})`;
	return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['kidmotor_motor_forward'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';
  Blockly.Python.definitions_['from_time_import_sleep'] = 'from time import sleep';

  var number_speed = block.getFieldValue('speed');
  var number_time = block.getFieldValue('time');
  
  var code = `${KIDMOTOR_GEN_SET_MOTOR(1, 1, number_speed)} ${KIDMOTOR_GEN_SET_MOTOR(2, 1, number_speed)} ${KIDMOTOR_GEN_DELAY(number_time)} ${KIDMOTOR_GEN_SET_MOTOR_STOP()}\n`;
  return code;
};

Blockly.Python['kidmotor_motor_backward'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';
  Blockly.Python.definitions_['from_time_import_sleep'] = 'from time import sleep';

  var number_speed = block.getFieldValue('speed');
  var number_time = block.getFieldValue('time');

  var code = `${KIDMOTOR_GEN_SET_MOTOR(1, 0, number_speed)} ${KIDMOTOR_GEN_SET_MOTOR(2, 0, number_speed)} ${KIDMOTOR_GEN_DELAY(number_time)} ${KIDMOTOR_GEN_SET_MOTOR_STOP()}\n`;
  return code;
};

Blockly.Python['kidmotor_motor_turn_left'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';
  Blockly.Python.definitions_['from_time_import_sleep'] = 'from time import sleep';

  var number_speed = block.getFieldValue('speed');
  var number_time = block.getFieldValue('time');
  var code = `${KIDMOTOR_GEN_SET_MOTOR(1, 1, 0)} ${KIDMOTOR_GEN_SET_MOTOR(2, 1, number_speed)} ${KIDMOTOR_GEN_DELAY(number_time)} ${KIDMOTOR_GEN_SET_MOTOR_STOP()}\n`;
  return code;
};

Blockly.Python['kidmotor_motor_turn_right'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';
  Blockly.Python.definitions_['from_time_import_sleep'] = 'from time import sleep';

  var number_speed = block.getFieldValue('speed');
  var number_time = block.getFieldValue('time');
  var code = `${KIDMOTOR_GEN_SET_MOTOR(1, 1, number_speed)} ${KIDMOTOR_GEN_SET_MOTOR(2, 0, 0)} ${KIDMOTOR_GEN_DELAY(number_time)} ${KIDMOTOR_GEN_SET_MOTOR_STOP()}\n`;
  return code;
};

Blockly.Python['kidmotor_motor_move'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

  var dropdown_move = block.getFieldValue('move');
  var number_speed = block.getFieldValue('speed');
  var code = '';;
  if (dropdown_move == 1) {
    code = `${KIDMOTOR_GEN_SET_MOTOR(1, 1, number_speed)} ${KIDMOTOR_GEN_SET_MOTOR(2, 1, number_speed)}\n`;
  } else if (dropdown_move == 2) {
    code = `${KIDMOTOR_GEN_SET_MOTOR(1, 0, number_speed)} ${KIDMOTOR_GEN_SET_MOTOR(2, 0, number_speed)}\n`;
  } else if (dropdown_move == 3) {
    code = `${KIDMOTOR_GEN_SET_MOTOR(1, 1, 0)} ${KIDMOTOR_GEN_SET_MOTOR(2, 1, number_speed)}\n`;
  } else if (dropdown_move == 4) {
    code = `${KIDMOTOR_GEN_SET_MOTOR(1, 1, number_speed)} ${KIDMOTOR_GEN_SET_MOTOR(2, 0, 0)}\n`;
  }
  return code;
};

Blockly.Python['kidmotor_motor_wheel'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

  var number_speed1 = block.getFieldValue('speed1');
  var number_speed2 = block.getFieldValue('speed2');

  var code = `${KIDMOTOR_GEN_SET_MOTOR(1, `1 if ${number_speed1} > 0 else 0`, `${number_speed1} if ${number_speed1} > 0 else (${number_speed1} * -1)`)} ${KIDMOTOR_GEN_SET_MOTOR(2, `1 if ${number_speed2} > 0 else 0`, `${number_speed2} if ${number_speed2} > 0 else (${number_speed2} * -1)`)}\n`;
  return code;
};

Blockly.Python['kidmotor_motor_stop'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

  var code = `${KIDMOTOR_GEN_SET_MOTOR_STOP()}\n`;
  return code;
};

Blockly.Python['kidmotor_servo_set_angle'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

	var dropdown_pin = block.getFieldValue('pin');
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC) || "0";
  
	var code = `${KIDMOTOR_BEGIN}.servoAngle(${dropdown_pin}, ${value_value});\n`;
	return code;
};

Blockly.Python['kidmotor_servo_unlock'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

	var dropdown_pin = block.getFieldValue('pin');
  
	var code = `${KIDMOTOR_BEGIN}.servoUnlock(${dropdown_pin});\n`;
	return code;
};

Blockly.Python['kidmotor_pwm_write'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

	var dropdown_pin = block.getFieldValue('pin');
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC) || "0";
  
	var code = `${KIDMOTOR_BEGIN}.setPWM(${dropdown_pin}, ${value_value});\n`;
	return code;
};

Blockly.Python['kidmotor_get_distance'] = function(block) {
  Blockly.Python.definitions_['import_KidMotorV4'] = 'import KidMotorV4';

	var dropdown_pin_trig = block.getFieldValue('pin_trig');
  var dropdown_pin_echo = block.getFieldValue('pin_echo');

	var code = `${KIDMOTOR_BEGIN}.distance(${dropdown_pin_trig}, ${dropdown_pin_echo})`;
	return [code, Blockly.Python.ORDER_NONE];
};


