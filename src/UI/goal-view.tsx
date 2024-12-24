import{ useState } from 'react';
import { 
  ChakraProvider, 
  Box, 
  VStack, 
  Heading, 
  Input, 
  Button, 
  Flex, 
  useDisclosure,
  

} from '@chakra-ui/react';
import { Select } from '@chakra-ui/select'
import { Tag,
          TagLabel,
          TagCloseButton } from "@chakra-ui/tag"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/modal'

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useGoals } from '@/hooks/useGoals';
import { LABEL_COLORS } from '@/constants/goals';
import { ColumnKey, Goal, LabelKey, NewGoal } from '@/types/goals';

export const GoalView: React.FC = () => {
  const { goals, columns, loading, createGoal, updateGoal, deleteGoal } = useGoals();
  const [newGoal, setNewGoal] = useState<NewGoal>({
    text: '',
    labels: [],
    column: 'shortTerm',
  });
  const [editingGoal, setEditingGoal] = useState<Goal & { column: ColumnKey } | null>(null);
  const { open, onOpen, onClose } = useDisclosure();

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId as ColumnKey;
    const destColumn = destination.droppableId as ColumnKey;

    if (sourceColumn !== destColumn) {
      await updateGoal(draggableId, { type: destColumn });
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.text) return;
    console.log(newGoal)
    await createGoal(newGoal.text, newGoal.labels, "#FFFFFF", newGoal.column);
    setNewGoal({ text: '', labels: [], column: 'shortTerm' });
    onClose();
  };

  const handleUpdateGoal = async () => {
    if (!editingGoal) return;
    await updateGoal(editingGoal.id, {
      text: editingGoal.text,
      tags: editingGoal.tags,
      type: editingGoal.column
    });
    onClose();
    setEditingGoal(null);
  };

 
  const toggleLabel = (label: LabelKey) => {
    if (editingGoal) {
      setEditingGoal((prev) => {
        if (!prev) return null;
        const newLabels = prev.tags.includes(label)
          ? prev.tags.filter((l) => l !== label)
          : [...prev.tags, label];
        return { ...prev, labels: newLabels };
      });
    } else {
      setNewGoal((prev) => {
        const newLabels = prev.labels.includes(label)
          ? prev.labels.filter((l) => l !== label)
          : [...prev.labels, label];
        return { ...prev, labels: newLabels };
      });
    }
  };

  const renderGoalModal = () => (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Enter goal"
            mb={4}
            value={editingGoal ? editingGoal.text : newGoal.text}
            onChange={(e) =>
              editingGoal
                ? setEditingGoal((prev) => (prev ? { ...prev, text: e.target.value } : null))
                : setNewGoal((prev) => ({ ...prev, text: e.target.value }))
            }
          />
          <Select
            mb={4}
            value={editingGoal ? editingGoal.column : newGoal.column}
            onChange={(e) => {
              const selectedColumn = e.target.value as ColumnKey;
              editingGoal
                ? setEditingGoal((prev) => (prev ? { ...prev, column: selectedColumn } : null))
                : setNewGoal((prev) => ({ ...prev, column: selectedColumn }));
            }}
          >
            <option value="shortTerm">Short Term</option>
            <option value="mediumTerm">Medium Term</option>
            <option value="longTerm">Long Term</option>
          </Select>
          <Flex wrap="wrap" gap={2} mb={4}>
            {(Object.keys(LABEL_COLORS) as LabelKey[]).map((label) => (
              <Tag
                key={label}
                colorScheme={LABEL_COLORS[label]}
                cursor="pointer"
                onClick={() => toggleLabel(label)}
                variant={
                  (editingGoal ? editingGoal.tags : newGoal.labels).includes(label)
                    ? 'solid'
                    : 'outline'
                }
              >
                {label}
              </Tag>
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={editingGoal ? handleUpdateGoal : handleAddGoal}>
            {editingGoal ? 'Update' : 'Add'}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box p={8}>
      <Heading mb={8} textAlign="center">
        Track your goals
      </Heading>
      <Button colorScheme="green" mb={4} onClick={onOpen}>
        Add New Goal
      </Button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Flex justifyContent="space-between">
          {(Object.entries(columns) as [ColumnKey, Goal[]][]).map(([columnId, goals]) => (
            <Box>
            <Heading 
              borderRadius={10}
              background={'purple.400'}
              padding={4}
              size="md"  
              textTransform="capitalize" 
              color={'black'}>
              
              {columnId.replace(/([A-Z])/g, ' $1')}
              </Heading>
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  w="300px"
                  minH="400px"
                  p={4}
                  border="1px solid"
                  borderColor={snapshot.isDraggingOver ? "blue.200" : "gray.200"}
                  borderRadius="md"
                  bg={snapshot.isDraggingOver ? "gray.50" : "white"}
                  transition="background-color 0.2s ease, border-color 0.2s ease"
                  position="relative"
                >


                  {goals.map((goal, index) => (
                    <Draggable key={goal.id} draggableId={goal.id} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          mb={2}
                          p={3}
                          bg={snapshot.isDragging ? "blue.50" : "white"}
                          boxShadow={snapshot.isDragging ? "lg" : "md"}
                          borderRadius="md"
                          border="1px solid"
                          borderColor={snapshot.isDragging ? "blue.200" : "transparent"}
                          transform={`${provided.draggableProps.style?.transform}`}
                          transition={snapshot.isDragging 
                            ? undefined 
                            : "box-shadow 0.2s ease, border-color 0.2s ease"}
                          _hover={{
                            boxShadow: "lg",
                            borderColor: "blue.100"
                          }}
                          userSelect="none"
                          position={snapshot.isDragging ? "relative" : "relative"}
                          zIndex={snapshot.isDragging ? 999 : 1}
                        >
                          <Flex justifyContent="space-between" alignItems="center">
                            <VStack align="start" gap={2} flex={1}>
                              <Box color={'black'}>{goal.text}</Box>
                              <Flex wrap="wrap" gap={2}>
                                {goal.tags.map((label) => (
                                  <Tag 
                                    key={label} 
                                    colorScheme={LABEL_COLORS[label]} 
                                    size="sm"
                                    userSelect="none"
                                  >
                                    {label}
                                  </Tag>
                                ))}
                              </Flex>
                            </VStack>
                            <Flex direction="column">
                              <Button
                                size="xs"
                                colorScheme="blue"
                                mb={1}
                                onClick={() => {setEditingGoal({ ...goal, column: columnId })
                                        onOpen()}}
                              >
                                Edit
                              </Button>
                              <Button
                                size="xs"
                                colorScheme="red"
                                onClick={() => deleteGoal(goal.id)}
                              >
                                Delete
                              </Button>
                            </Flex>
                          </Flex>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            </Box>
          ))}
        </Flex>
      </DragDropContext>
      {renderGoalModal()}
    </Box>
  );
};


export default GoalView;
