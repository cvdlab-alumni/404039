
window_1 = CUBOID([25,2,10.08])

window_1_t = T([1,3])([58.35,39])(window_1)

final_windows = STRUCT(NN(3)([COLOR(BLACK)(window_1_t),T([3])([23.5])]))  #3xblack windows