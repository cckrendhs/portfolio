precision mediump float;

uniform sampler2D uTexture;
uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vTexCoord;

void main() {
  vec2 st = vTexCoord;
  vec4 texColor = texture2D(uTexture, st);
  gl_FragColor = texColor;
}
