@php
    $order = 1;
@endphp
@foreach($listTags as $tag)
                        <tr>
                            <td class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">{{$order}}</h6>
                            </td>
                            @php
                                $order++;
                            @endphp
                            <td class="border-bottom-0">
                                <h6 class="fw-semibold mb-1">{{$tag->name}}</h6>
                            </td>
                            @if($tag->deleted_at)
                            <td class="border-bottom-0">
                                <font class="badge bg-danger rounded-3 fw-semibol">
                                    Inactive
                                </font>
                            </td>
                            @else
                            <td class="border-bottom-0">
                                <font class="badge bg-success rounded-3 fw-semibol">
                                    Active
                                </font>
                            </td>
                            @endif
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-icon rounded-pill hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="ti ti-dots-vertical"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li><button class="edit-tag-btn dropdown-item" data-bs-toggle="modal" data-bs-target="#editTag" item-name="{{$tag->name}}" item-id="{{$tag->id}}" >Edit</button></li>
                                        @if($tag->deleted_at)
                                        <li><a href="{{ route('tag.delete', ['id' => $tag->id] )}}" class="dropdown-item">Restore</a></li>
                                        @else
                                        <li><a href="{{ route('tag.delete', ['id' => $tag->id] )}}" class="dropdown-item">Delete</a></li>
                                        @endif
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        @endforeach