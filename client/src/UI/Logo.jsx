import React from 'react';

const Logo = ({ size, color, heartColor }) => {
    const outer = { fill: color, fillRule: 'nonzero' };
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 41 46"
            style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLineJoin: 'round', strokeMiterLimit: 2 }}
        >
            <g transform="matrix(1,0,0,1,-86,-768)">
                <g
                    id="final-logo"
                    transform="matrix(0.180692,0,0,0.254549,71.6588,573.05)"
                >
                    <rect
                        x="83.068"
                        y="768.199"
                        width="221.395"
                        height="177.936"
                        style={{ fill: 'none' }}
                    />
                    <g
                        id="heart"
                        transform="matrix(4.3237,0,0,3.47859,-271.51,-1895.5)"
                    >
                        <rect
                            x="97.53"
                            y="784.832"
                            width="20.314"
                            height="16.154"
                            style={{ fill: heartColor }}
                        />
                    </g>
                    <g id="Icon">
                        <g transform="matrix(13.7743,0,0,9.77774,83.8349,757.649)">
                            <path
                                d="M14,9.293L8,3.293L2,9.293L2,13.5C2,14.323 2.677,15 3.5,15L12.5,15C13.323,15 14,14.323 14,13.5L14,9.293ZM8,8.482C9.664,6.809 13.825,9.736 8,13.5C2.175,9.736 6.336,6.809 8,8.482Z"
                                style={outer}
                            />
                        </g>
                        <g transform="matrix(13.7743,0,0,9.77774,83.8349,757.649)">
                            <path
                                d="M7.293,1.5C7.681,1.112 8.319,1.112 8.707,1.5L11,3.793L11,2.5C11,2.226 11.226,2 11.5,2L12.5,2C12.774,2 13,2.226 13,2.5L13,5.793L15.354,8.146C15.448,8.24 15.5,8.367 15.5,8.499C15.5,8.774 15.274,9 15,9C14.867,9 14.74,8.947 14.646,8.853L8,2.207L1.354,8.853C1.26,8.947 1.133,9 1,9C0.726,9 0.5,8.774 0.5,8.5C0.5,8.367 0.552,8.24 0.646,8.146L7.293,1.5Z"
                                style={outer}
                            />
                        </g>
                    </g>
                    <g
                        id="Text"
                        transform="matrix(9.96628,0,0,4.28703,-816.011,-2540.98)"
                    >
                        <path
                            d="M92.408,806.73L92.408,807.514L90.984,807.514L90.984,809.083L92.185,809.083L92.185,809.871L90.984,809.871L90.984,812.03L90.382,812.03L90.382,806.73L92.408,806.73Z"
                            style={outer}
                        />
                        <path
                            d="M94.631,812.03L94.384,812.03C94.333,812.03 94.292,812.018 94.262,811.992C94.233,811.966 94.21,811.914 94.196,811.836L94.147,811.569C94.089,811.654 94.032,811.729 93.977,811.794C93.921,811.859 93.864,811.913 93.805,811.957C93.746,812.001 93.683,812.034 93.616,812.056C93.549,812.078 93.475,812.089 93.394,812.089C93.298,812.089 93.209,812.068 93.127,812.025C93.046,811.982 92.976,811.918 92.917,811.832C92.859,811.747 92.813,811.641 92.781,811.514C92.748,811.386 92.732,811.239 92.732,811.07C92.732,810.928 92.754,810.788 92.8,810.65C92.845,810.512 92.92,810.388 93.025,810.276C93.13,810.165 93.27,810.073 93.445,810C93.62,809.926 93.837,809.885 94.096,809.875L94.096,809.655C94.096,809.403 94.064,809.217 93.999,809.096C93.935,808.975 93.841,808.915 93.718,808.915C93.629,808.915 93.555,808.932 93.496,808.966C93.437,809 93.385,809.039 93.342,809.081C93.298,809.124 93.258,809.163 93.221,809.197C93.184,809.231 93.143,809.248 93.098,809.248C93.061,809.248 93.03,809.232 93.003,809.201C92.976,809.169 92.955,809.13 92.938,809.083L92.839,808.794C93.101,808.398 93.417,808.2 93.787,808.2C93.92,808.2 94.039,808.236 94.143,808.308C94.248,808.38 94.336,808.48 94.409,808.609C94.481,808.737 94.537,808.89 94.574,809.069C94.612,809.247 94.631,809.443 94.631,809.655L94.631,812.03ZM93.565,811.466C93.621,811.466 93.673,811.457 93.72,811.44C93.768,811.423 93.813,811.397 93.855,811.363C93.897,811.329 93.938,811.287 93.977,811.237C94.016,811.187 94.056,811.127 94.096,811.059L94.096,810.425C93.936,810.437 93.802,810.46 93.695,810.493C93.587,810.526 93.501,810.568 93.436,810.619C93.371,810.67 93.325,810.73 93.297,810.799C93.27,810.867 93.256,810.942 93.256,811.022C93.256,811.181 93.285,811.295 93.342,811.363C93.399,811.432 93.473,811.466 93.565,811.466Z"
                            style={outer}
                        />
                        <path
                            d="M95.171,812.03L95.171,808.27L95.506,808.27C95.577,808.27 95.624,808.325 95.646,808.435L95.682,808.713C95.722,808.64 95.763,808.573 95.807,808.511C95.851,808.45 95.897,808.398 95.947,808.354C95.997,808.31 96.05,808.275 96.107,808.249C96.164,808.224 96.227,808.211 96.295,808.211C96.438,808.211 96.556,808.275 96.649,808.403C96.742,808.532 96.811,808.702 96.857,808.915C96.892,808.79 96.937,808.683 96.99,808.594C97.043,808.505 97.102,808.432 97.165,808.376C97.229,808.32 97.297,808.278 97.369,808.251C97.44,808.224 97.513,808.211 97.585,808.211C97.711,808.211 97.823,808.243 97.921,808.306C98.018,808.37 98.101,808.463 98.167,808.585C98.234,808.707 98.285,808.856 98.319,809.032C98.354,809.208 98.372,809.41 98.372,809.637L98.372,812.03L97.823,812.03L97.823,809.637C97.823,809.397 97.791,809.217 97.727,809.096C97.664,808.975 97.57,808.915 97.448,808.915C97.391,808.915 97.339,808.931 97.291,808.962C97.243,808.994 97.201,809.04 97.164,809.1C97.128,809.16 97.1,809.235 97.079,809.325C97.058,809.416 97.048,809.519 97.048,809.637L97.048,812.03L96.497,812.03L96.497,809.637C96.497,809.385 96.466,809.202 96.405,809.087C96.343,808.972 96.253,808.915 96.133,808.915C96.054,808.915 95.98,808.947 95.912,809.012C95.843,809.077 95.779,809.165 95.719,809.278L95.719,812.03L95.171,812.03Z"
                            style={outer}
                        />
                        <path
                            d="M99.495,808.27L99.495,812.03L98.947,812.03L98.947,808.27L99.495,808.27ZM99.578,807.174C99.578,807.252 99.568,807.325 99.549,807.393C99.53,807.462 99.504,807.522 99.472,807.573C99.44,807.624 99.403,807.665 99.36,807.696C99.317,807.726 99.271,807.742 99.222,807.742C99.175,807.742 99.13,807.726 99.088,807.696C99.046,807.665 99.009,807.624 98.978,807.573C98.947,807.522 98.922,807.462 98.904,807.393C98.885,807.325 98.876,807.252 98.876,807.174C98.876,807.093 98.885,807.017 98.904,806.946C98.922,806.875 98.947,806.814 98.978,806.763C99.009,806.712 99.046,806.671 99.088,806.64C99.13,806.61 99.175,806.594 99.222,806.594C99.271,806.594 99.317,806.61 99.36,806.64C99.403,806.671 99.44,806.712 99.472,806.763C99.504,806.814 99.53,806.875 99.549,806.946C99.568,807.017 99.578,807.093 99.578,807.174Z"
                            style={outer}
                        />
                        <rect
                            x="100.151"
                            y="806.583"
                            width="0.549"
                            height="5.447"
                            style={outer}
                        />
                        <path
                            d="M102.128,813.064C102.111,813.128 102.09,813.176 102.064,813.209C102.038,813.242 101.999,813.258 101.945,813.258L101.537,813.258L101.963,811.752L101.041,808.27L101.521,808.27C101.566,808.27 101.6,808.287 101.623,808.321C101.647,808.355 101.665,808.394 101.677,808.438L102.163,810.388C102.179,810.452 102.193,810.518 102.205,810.586C102.217,810.655 102.228,810.723 102.236,810.791C102.248,810.721 102.261,810.652 102.275,810.586C102.289,810.52 102.305,810.453 102.321,810.385L102.778,808.438C102.79,808.389 102.81,808.349 102.837,808.317C102.865,808.285 102.895,808.27 102.929,808.27L103.369,808.27L102.128,813.064Z"
                            style={outer}
                        />
                        <path
                            d="M107.401,812.03L106.939,812.03C106.887,812.03 106.844,812.009 106.811,811.966C106.778,811.923 106.754,811.87 106.739,811.807L106.499,810.725L105.168,810.725L104.928,811.807C104.917,811.863 104.893,811.914 104.859,811.961C104.824,812.007 104.781,812.03 104.731,812.03L104.267,812.03L105.528,806.73L106.139,806.73L107.401,812.03ZM105.322,810.029L106.346,810.029L105.955,808.266C105.937,808.188 105.917,808.095 105.896,807.989C105.874,807.883 105.853,807.767 105.833,807.643C105.812,807.767 105.791,807.883 105.771,807.991C105.751,808.098 105.732,808.193 105.713,808.273L105.322,810.029Z"
                            style={outer}
                        />
                        <path
                            d="M107.701,813.258L107.701,808.27L108.036,808.27C108.071,808.27 108.102,808.283 108.127,808.31C108.152,808.337 108.168,808.378 108.176,808.435L108.22,808.783C108.312,808.609 108.418,808.469 108.537,808.361C108.656,808.254 108.796,808.2 108.956,808.2C109.08,808.2 109.194,808.243 109.296,808.328C109.399,808.414 109.488,808.538 109.563,808.7C109.638,808.863 109.696,809.063 109.736,809.301C109.777,809.54 109.797,809.813 109.797,810.121C109.797,810.402 109.774,810.662 109.729,810.901C109.683,811.141 109.617,811.349 109.532,811.525C109.447,811.7 109.344,811.838 109.223,811.937C109.102,812.036 108.967,812.085 108.818,812.085C108.689,812.085 108.58,812.053 108.49,811.988C108.401,811.923 108.32,811.834 108.249,811.719L108.249,813.258L107.701,813.258ZM108.767,808.915C108.653,808.915 108.555,808.954 108.475,809.034C108.394,809.113 108.319,809.225 108.249,809.369L108.249,811.055C108.311,811.182 108.379,811.271 108.452,811.321C108.526,811.371 108.605,811.396 108.689,811.396C108.772,811.396 108.847,811.371 108.914,811.319C108.982,811.268 109.039,811.19 109.085,811.085C109.132,810.98 109.168,810.847 109.193,810.687C109.218,810.527 109.231,810.338 109.231,810.121C109.231,809.901 109.22,809.714 109.199,809.562C109.177,809.409 109.147,809.285 109.107,809.19C109.067,809.094 109.018,809.025 108.961,808.981C108.904,808.937 108.839,808.915 108.767,808.915Z"
                            style={outer}
                        />
                        <path
                            d="M110.213,813.258L110.213,808.27L110.548,808.27C110.584,808.27 110.614,808.283 110.639,808.31C110.664,808.337 110.681,808.378 110.688,808.435L110.732,808.783C110.824,808.609 110.93,808.469 111.049,808.361C111.168,808.254 111.308,808.2 111.468,808.2C111.592,808.2 111.706,808.243 111.809,808.328C111.912,808.414 112,808.538 112.075,808.7C112.15,808.863 112.208,809.063 112.248,809.301C112.289,809.54 112.31,809.813 112.31,810.121C112.31,810.402 112.287,810.662 112.241,810.901C112.195,811.141 112.129,811.349 112.044,811.525C111.959,811.7 111.856,811.838 111.735,811.937C111.615,812.036 111.48,812.085 111.33,812.085C111.201,812.085 111.092,812.053 111.002,811.988C110.913,811.923 110.832,811.834 110.761,811.719L110.761,813.258L110.213,813.258ZM111.279,808.915C111.165,808.915 111.068,808.954 110.987,809.034C110.906,809.113 110.831,809.225 110.761,809.369L110.761,811.055C110.824,811.182 110.891,811.271 110.965,811.321C111.038,811.371 111.117,811.396 111.201,811.396C111.284,811.396 111.359,811.371 111.427,811.319C111.494,811.268 111.551,811.19 111.598,811.085C111.644,810.98 111.68,810.847 111.705,810.687C111.731,810.527 111.743,810.338 111.743,810.121C111.743,809.901 111.732,809.714 111.711,809.562C111.689,809.409 111.659,809.285 111.619,809.19C111.579,809.094 111.53,809.025 111.473,808.981C111.416,808.937 111.351,808.915 111.279,808.915Z"
                            style={outer}
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default Logo;
