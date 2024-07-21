export default function useMediaPipe() {
  const mpPose = new window.Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    },
  });

  mpPose.setOptions({
    selfieMode: true,
    upperBodyOnly: false,
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  return mpPose;
}
