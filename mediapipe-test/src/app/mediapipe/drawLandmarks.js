import * as mposeUtils from './mpPose.util';
import store from '../../store';
import { plusCount } from '../../store/slices/squtSlice';

const POSE_LANDMARKS_LEFT = {
  LEFT_SHOULDER: 11,
  LEFT_ELBOW: 13,
  LEFT_WRIST: 15,
  LEFT_HIP: 23,
  LEFT_KNEE: 25,
  LEFT_ANKLE: 27,
};

const POSE_LANDMARKS_RIGHT = {
  RIGHT_SHOULDER: 12,
  RIGHT_ELBOW: 14,
  RIGHT_WRIST: 16,
  RIGHT_HIP: 24,
  RIGHT_KNEE: 26,
  RIGHT_ANKLE: 28,
};

const POSE_LANDMARKS = {
  ...POSE_LANDMARKS_LEFT,
  ...POSE_LANDMARKS_RIGHT,
};

const POSE_CONNECTIONS = [
  [POSE_LANDMARKS.LEFT_SHOULDER, POSE_LANDMARKS.RIGHT_SHOULDER],
  [POSE_LANDMARKS.LEFT_SHOULDER, POSE_LANDMARKS.LEFT_ELBOW],
  [POSE_LANDMARKS.LEFT_ELBOW, POSE_LANDMARKS.LEFT_WRIST],
  [POSE_LANDMARKS.RIGHT_SHOULDER, POSE_LANDMARKS.RIGHT_ELBOW],
  [POSE_LANDMARKS.RIGHT_ELBOW, POSE_LANDMARKS.RIGHT_WRIST],
  [POSE_LANDMARKS.LEFT_SHOULDER, POSE_LANDMARKS.LEFT_HIP],
  [POSE_LANDMARKS.RIGHT_SHOULDER, POSE_LANDMARKS.RIGHT_HIP],
  [POSE_LANDMARKS.LEFT_HIP, POSE_LANDMARKS.RIGHT_HIP],
  [POSE_LANDMARKS.LEFT_HIP, POSE_LANDMARKS.LEFT_KNEE],
  [POSE_LANDMARKS.RIGHT_HIP, POSE_LANDMARKS.RIGHT_KNEE],
  [POSE_LANDMARKS.LEFT_KNEE, POSE_LANDMARKS.LEFT_ANKLE],
  [POSE_LANDMARKS.RIGHT_KNEE, POSE_LANDMARKS.RIGHT_ANKLE],
];

let lastValidDispatchTime = 0;
const DISPATCH_INTERVAL = 3000;

function drawPoseLandmarks(canvas, results, poseClassifierCallback) {
  const { invalidConnections } = poseClassifierCallback(poseAngles(results));
  const { poseLandmarks } = results;

  window.drawConnectors(canvas, poseLandmarks, POSE_CONNECTIONS, {
    visibilityMin: 0.65,
    color: 'green',
  });
  window.drawConnectors(canvas, poseLandmarks, invalidConnections, {
    visibilityMin: 0.65,
    color: 'red',
  });

  window.drawLandmarks(
    canvas,
    Object.values(POSE_LANDMARKS_LEFT).map((index) => poseLandmarks[index]),
    { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' }
  );
  window.drawLandmarks(
    canvas,
    Object.values(POSE_LANDMARKS_RIGHT).map((index) => poseLandmarks[index]),
    { visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)' }
  );

  const currentTime = Date.now();
  if (invalidConnections.length < 1) {
    if (currentTime - lastValidDispatchTime > DISPATCH_INTERVAL) {
      store.dispatch(plusCount());
      lastValidDispatchTime = currentTime;
    }
  }
}

function poseAngles(results) {
  const simplifiedPoseLandmarks = mposeUtils.simplifyPoseLandmarks(results);
  return mposeUtils.calcFullPoseAngles(simplifiedPoseLandmarks);
}

export {
  drawPoseLandmarks,
  POSE_CONNECTIONS,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
  POSE_LANDMARKS,
};
