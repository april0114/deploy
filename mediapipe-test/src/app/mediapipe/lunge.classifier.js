import * as mposeUtils from './mpPose.util';

function lungeClassifier(angles) {
  console.log('angles', angles);
  const invalidConnections = [];

  const isUpperBodyDetected =
    angles.left_armAngle > 0 &&
    angles.right_armAngle > 0 &&
    angles.left_armToTorsoAngle > 0 &&
    angles.right_armToTorsoAngle > 0 &&
    angles.left_hipToTorsoAngle > 0 &&
    angles.right_hipToTorsoAngle > 0;
  const isLowerBodyDetected =
    angles.left_legAngle > 0 &&
    angles.right_legAngle > 0 &&
    angles.left_legToHipAngle > 0 &&
    angles.right_legToHipAngle > 0;

  if (!isUpperBodyDetected || !isLowerBodyDetected) {
    console.log('Upper or lower body not detected properly');
    invalidConnections.push(mposeUtils.getLeftHipToKneeConnectors());
    invalidConnections.push(mposeUtils.getLeftKneeToAnkleConnectors());
    invalidConnections.push(mposeUtils.getRightHipToKneeConnectors());
    invalidConnections.push(mposeUtils.getRightKneeToAnkleConnectors());
    invalidConnections.push(mposeUtils.getLeftShoulderToElbowConnectors());
    invalidConnections.push(mposeUtils.getLeftElbowToWristConnectors());
    invalidConnections.push(mposeUtils.getRightShoulderToElbowConnectors());
    invalidConnections.push(mposeUtils.getRightElbowToWristConnectors());
    return { invalidConnections, pose: 'Invalid' };
  }

  // 왼쪽 다리와 엉덩이 각도 검사
  if (angles.left_legToHipAngle < 70 || angles.left_hipToTorsoAngle > 110) {
    console.log('left leg to hip angles is wrong');
    invalidConnections.push(mposeUtils.getLeftHipToKneeConnectors());
    invalidConnections.push(mposeUtils.getLeftKneeToAnkleConnectors());
  } else {
    console.log('left leg to hip angles is right');
  }

  // 오른쪽 다리와 엉덩이 각도 검사
  if (angles.right_legToHipAngle < 70 || angles.right_legToHipAngle > 110) {
    console.log('right leg to hip angles is wrong');
    invalidConnections.push(mposeUtils.getRightHipToKneeConnectors());
    invalidConnections.push(mposeUtils.getRightKneeToAnkleConnectors());
  } else {
    console.log('right leg to hip angles is right');
  }

  return { invalidConnections, pose: 'Lunge' };
}

export default lungeClassifier;
