import sys
import argparse
import cv2
import numpy as np

parser = argparse.ArgumentParser()
parser.add_argument("input",  help="input image file")
parser.add_argument("output", help="output file")
parser.add_argument("width",  help="output image width or auto")
parser.add_argument("height", help="output image height or auto")
parser.add_argument("--harea", help="visible area: 0=left, 50=center, 100=right  (default=50)", type=int, default=50)
parser.add_argument("--varea", help="visible area: 0=top,  50=center, 100=bottom (default=50)", type=int, default=50)
parser.add_argument("--webp-quality", help="quality between 1 and 100 (default=50)", type=int, default=50)
parser.add_argument("--jpeg-quality", help="quality between 0 and 100 (default=80)", type=int, default=80)
parser.add_argument("--j2-quality",   help="quality between 0 and 100 (default=70)", type=int, default=70)

args = parser.parse_args()

input_path = args.input
output_path = args.output

h_slider = args.harea
v_slider = args.varea

in_img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)

in_height = in_img.shape[0]
in_width = in_img.shape[1]

if args.width == "auto" and args.height == "auto":
    out_width = in_width
    out_height = in_height

elif args.width == "auto":
    out_height = int(args.height)
    out_width = int((in_width / in_height) * out_height)

elif args.height == "auto":
    out_width = int(args.width)
    out_height = int((in_height / in_width) * out_width)

else:
    out_width = int(args.width)
    out_height = int(args.height)


in_ratio = in_width / in_height
out_ratio = out_width / out_height


if (in_ratio > out_ratio):
    # input is "wider" than output (unused slices of image on left and right)
    # find patch - the biggest slice of input with output's ratio
    scale = in_height / out_height

    patch_height = in_height
    patch_width = int(scale * out_width)

    patch_offset_left = int((in_width - patch_width) * h_slider / 100)
    patch = in_img[:,patch_offset_left:patch_offset_left + patch_width]
else:
    # input is "taller" than output (unused slices of image on top and bottom)
    scale = in_width / out_width

    patch_width = in_width
    patch_height = int(scale * out_height)

    patch_offset_top = int((in_height - patch_height) * v_slider / 100)
    patch = in_img[patch_offset_top:patch_offset_top + patch_height,:]


if (in_width > out_width):
    # scaling down
    inter = cv2.INTER_AREA
else:
    # scaling up
    inter = cv2.INTER_CUBIC


out_img = np.zeros((out_height, out_width, in_img.shape[2]), dtype=in_img.dtype)
cv2.resize(patch, (out_width, out_height), out_img, interpolation=inter)


ext = output_path.split(".")[-1]
params = {
    "png": [
        cv2.IMWRITE_PNG_COMPRESSION, 9,
    ],
    "jpg": [
        cv2.IMWRITE_JPEG_QUALITY,     args.jpeg_quality,
        cv2.IMWRITE_JPEG_PROGRESSIVE, 1,
        cv2.IMWRITE_JPEG_OPTIMIZE,    1,
    ],
    "j2": [
        cv2.IMWRITE_JPEG2000_COMPRESSION_X1000, args.j2_quality * 10,
    ],
    "webp": [
        cv2.IMWRITE_WEBP_QUALITY, args.webp_quality,
    ],
}[ext]

cv2.imwrite(output_path, out_img, params)

