import { Component, OnInit ,Input} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Move } from 'src/app/models/move.model';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss']
})
export class MovesListComponent implements OnInit {

  constructor() { }

  @Input() currContactMoves: Move[];
  @Input() last3Moves: Move[];

  faHistory=faHistory;

  ngOnInit(): void {}

}
