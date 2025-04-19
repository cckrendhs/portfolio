attribute vec3 aPosition;
varying vec2 vTexCoord;

void main() {
  vTexCoord = (aPosition.xy + 1.0) * 0.5; // 將坐標轉換為紋理坐標
  gl_Position = vec4(aPosition, 1.0);
}
