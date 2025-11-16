function update() {
	clear_canvases();
	calculate_output();
	move_deathwall();
	handle_player_physics();

	draw_boxes();
	draw_player();
	draw_deathwall();
	draw_blood();
	draw_eye_net();
	draw_debug_text();
	
	draw_obs_squares();
	draw_obs_grid();
	draw_gates();
	draw_buttons();
	
	update_progress_graph();
	
	requestAnimationFrame(update);
}

load_level("starrevelt_level");
update();