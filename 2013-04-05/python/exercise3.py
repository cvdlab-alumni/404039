GRID = COMP([INSR(PROD),AA(QUOTE)])

#WEST 

right_part_west = GRID([[-50.4,63.4],[2],[106.45]])
upper_centre_west = GRID([[-25.21,25.21],[2],[-51.50,54.94]])
left_middle_west = GRID([[14.77],[2],[-25.21,81.23]])
upper_window_west= GRID([[-14.76,8.28],[2],[-73.84,32.61]])
inner_window_west= GRID([[-17.2,5.4],[2],[-62.85,13]])
upper_wall_west = GRID([[114],[2],[-73.84,32.61]])
between_windows_west = GRID([[114],[2],[-51.5,13.6]])
low_wall_west = GRID([[-17.55,17.55,-5,4,17.55],[2],[4.77]])
low_window_grid_west = GRID([[-34.94,5.43],[2],[18.19,-5.4,16.12]])
mid_window_offset_west = GRID([[-40.3,14.40],[2],[39.8]])
mid_window_offset2_west = GRID([[-17.46,17.46],[2],[39.8]])
window_fill_west = GRID([[25.2],[2],[-25.21,27.5]])

west_side = STRUCT([right_part_west, upper_centre_west,upper_window_west,inner_window_west,left_middle_west,upper_wall_west,between_windows_west,low_wall_west,low_window_grid_west,window_fill_west, mid_window_offset_west,mid_window_offset2_west])
west_r = R([1,2])(PI)(west_side)

west = T([1,2])([114,68.5])(west_r)

#NORTH

north_wall_1 = GRID([[2.52],[2],[106.4]])
north_wall_2 = GRID([[-2.52,50.6],[2],[-25,13.69,-10.08,13.69,-10.08,14.05,-10.08,9.8]])
north_wall_3 = GRID([[-53.12,8.6,-2.40,4.3],[2],[-25,81.4]])
north_wall_4 = GRID([[-61.5,2.9],[2],[-25,2.88,-25.21,2.88,-21.61,2.88,-21.61,3.93]])

north_side = STRUCT([north_wall_1,north_wall_2,north_wall_3,north_wall_4])
north_r = R([1,2])(PI/2)(north_side)

north = T([1])([114])(north_r)

#EAST
east_wall_1 = GRID([[55.29],[2],[-25,59.8,-11.99,11.6]])
east_wall_2 = GRID([[-55.29,3.3,-25.21,30.98],[2],[-25,81.4]])
east_wall_3 = GRID([[-58.35,25.9],[2],[-25,13.75,-10.08,13.75,-10.08,13.75,-10.08,9.91]])

east = STRUCT([east_wall_1,east_wall_2,east_wall_3])

#SOUTH
south_wall_1 = GRID([[68.5],[2],[-25,1.8,-22.51,4.32,-22.51,11.53,-10.99,7.74]])
south_wall_2 = GRID([[14.66,-50.68,3.16],[2],[-53.12,24.53]])
south_wall_3 = GRID([[2.5,-10.8,1.45],[2],[-25,-0.09,24.5]])
south_wall_4 = GRID([[-65.37,3.12],[2],[-25,60.15]])
south_wall_5 = GRID([[0.36,-12.06,0.36],[2],[-85,15.6]])
south_side = STRUCT([south_wall_1,south_wall_2,south_wall_3,south_wall_4,south_wall_5])
south_r= R([1,2])(-PI/2)(south_side)

south = T([2])([68.5])(south_r)

walls = STRUCT([south,north,east,west])

VIEW(walls)
