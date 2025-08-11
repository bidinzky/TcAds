import * as z from "zod/mini";

export const BOOL = z.union([z.boolean(), z.number().check(z.minimum(0), z.maximum(1))]);
export const BYTE = z.number().check(z.minimum(0), z.maximum(255));
export const WORD = z.number().check(z.minimum(0), z.maximum(65535));
export const DWORD = z.number().check(z.minimum(0), z.maximum(4294967295));
export const LWORD = z.bigint().check(z.minimum(0), z.maximum((1n << 64n) - 1n));
export const SINT = z.number().check(z.minimum(-128), z.maximum(127));
export const USINT = BYTE;
export const INT = z.number().check(z.minimum(-32768), z.maximum(32767));
export const UINT = WORD;
export const DINT = z.number().check(z.minimum(-2147483648), z.maximum(2147483647));
export const UDINT = DWORD;
export const LINT = z.bigint().check(z.minimum(-1n << 63n), z.maximum((1n << 63n) - 1n));
export const ULINT = LWORD;

const FLOAT32_MIN = -3.4e38
const FLOAT32_MAX = -FLOAT32_MIN
export const REAL = z.number()
	.check(
		z.refine((num: number) => {
			const arr = Float32Array.from([num])[0]
			const diff = Math.abs(arr! - num)
			const error = Math.abs(num / 10)
			// console.log(`Float32Schema
			//   num -> ${num}
			//   arr -> ${arr}
			//   dif -> ${diff}
			//   err -> ${error}
			// `)
			return diff < error
		}, { message: 'Invalid number, it is not a Float32 number' }),
		z.minimum(FLOAT32_MIN, `It should be greater than or equal to ${FLOAT32_MIN}`),
		z.maximum(FLOAT32_MAX, `It should be less than or equal to ${FLOAT32_MAX}`)
	)

const FLOAT64_MIN = -1.8e308
const FLOAT64_MAX = -FLOAT64_MIN
export const LREAL = z.number()
	.check(
		z.refine((num: number) => {
			const arr = Float64Array.from([num])[0]
			const diff = Math.abs(arr! - num)
			const error = Math.abs(num / 10)
			// console.log(`Float32Schema
			//   num -> ${num}
			//   arr -> ${arr}
			//   dif -> ${diff}
			//   err -> ${error}
			// `)
			return diff < error
		}, { message: 'Invalid number, it is not a Float64 number' }),
		z.minimum(FLOAT64_MIN, `It should be greater than or equal to ${FLOAT64_MIN}`),
		z.maximum(FLOAT64_MAX, `It should be less than or equal to ${FLOAT64_MAX}`)
	);
